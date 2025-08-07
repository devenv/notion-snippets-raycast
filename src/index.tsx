import { ActionPanel, Action, List, showToast, Toast, Icon, Detail, Color } from "@raycast/api";
import { useState, useEffect } from "react";
import { getSnippets, Snippet, updateUsageCount } from "./lib/notion";

export default function SearchSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [showingDetail, setShowingDetail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const data = await getSnippets();
        setSnippets(data);
      } catch (error) {
        showToast(Toast.Style.Failure, "Failed to fetch snippets", String(error));
      } finally {
        setLoading(false);
      }
    }
    fetchSnippets();
  }, []);

  // Language-specific icons mapping
  const getLanguageIcon = (language: string): Icon => {
    const icons: Record<string, Icon> = {
      javascript: Icon.Globe,
      typescript: Icon.Code,
      python: Icon.Bug,
      react: Icon.Star,
      css: Icon.Brush,
      html: Icon.Document,
      sql: Icon.CommandSymbol,
      shell: Icon.Terminal,
      go: Icon.Rocket,
      rust: Icon.Gear,
    };
    return icons[language.toLowerCase()] || Icon.Code;
  };

  // Filter snippets based on search and language filter
  const filteredSnippets = snippets.filter(snippet => {
    if (languageFilter && snippet.language !== languageFilter) {
      return false;
    }
    return true;
  });

  const handleCopySnippet = async (snippet: Snippet) => {
    try {
      // Update usage count
      await updateUsageCount(snippet.id, (snippet.usageCount || 0) + 1);

      // Update local state
      setSnippets(prev => 
        prev.map(s => 
          s.id === snippet.id 
            ? { ...s, usageCount: (s.usageCount || 0) + 1 }
            : s
        )
      );

      showToast(Toast.Style.Success, "📋 Copied to clipboard!");
    } catch (error) {
      showToast(Toast.Style.Failure, "❌ Failed to update usage count");
    }
  };

  // Show detail view for code preview
  if (showingDetail) {
    const snippet = snippets.find(s => s.id === showingDetail);
    if (snippet) {
      return (
        <Detail
          markdown={`# ${snippet.name}

**Language:** ${snippet.language}  
**Category:** ${snippet.category}  
**Usage Count:** ${snippet.usageCount || 0}  

## Description
${snippet.description || "No description provided"}

## Code
\`\`\`${snippet.language}
${snippet.code}
\`\`\`
`}
          actions={
            <ActionPanel>
              <Action
                title="← Back to List"
                icon={Icon.ArrowLeft}
                onAction={() => setShowingDetail(null)}
              />
              <Action.CopyToClipboard
                title="Copy Code"
                icon={Icon.Clipboard}
                content={snippet.code}
                onCopy={() => handleCopySnippet(snippet)}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
              <Action.Paste
                title="Paste Code"
                icon={Icon.Text}
                content={snippet.code}
                onPaste={() => handleCopySnippet(snippet)}
                shortcut={{ modifiers: ["cmd"], key: "v" }}
              />
              <Action.OpenInBrowser 
                title="Open in Notion"
                icon={Icon.Globe}
                url={`https://notion.so/${snippet.id.replace(/-/g, "")}`}
                shortcut={{ modifiers: ["cmd"], key: "o" }}
              />
            </ActionPanel>
          }
        />
      );
    }
  }

  return (
    <List 
      isLoading={loading} 
      searchBarPlaceholder="Search snippets by name, description, or language..."
      searchBarAccessory={
        <List.Dropdown 
          tooltip="Filter by Language" 
          value={languageFilter}
          onChange={setLanguageFilter}
        >
          <List.Dropdown.Item title="🌍 All Languages" value="" />
          <List.Dropdown.Item title="🟨 JavaScript" value="javascript" />
          <List.Dropdown.Item title="🔷 TypeScript" value="typescript" />
          <List.Dropdown.Item title="🐍 Python" value="python" />
          <List.Dropdown.Item title="⚛️ React" value="react" />
          <List.Dropdown.Item title="🎨 CSS" value="css" />
          <List.Dropdown.Item title="📄 HTML" value="html" />
          <List.Dropdown.Item title="🗄️ SQL" value="sql" />
          <List.Dropdown.Item title="💻 Shell" value="shell" />
          <List.Dropdown.Item title="🚀 Go" value="go" />
          <List.Dropdown.Item title="⚙️ Rust" value="rust" />
        </List.Dropdown>
      }
    >
      {filteredSnippets.length === 0 && !loading && snippets.length === 0 && (
        <List.EmptyView
          icon="🚀"
          title="Welcome to Notion Snippets!"
          description="Add your first code snippet using the 'Add Snippet' command to get started"
          actions={
            <ActionPanel>
              <Action
                title="Add First Snippet"
                icon={Icon.Plus}
                onAction={() => {/* Raycast will handle navigation */}}
                shortcut={{ modifiers: ["cmd"], key: "n" }}
              />
            </ActionPanel>
          }
        />
      )}

      {filteredSnippets.length === 0 && !loading && snippets.length > 0 && (
        <List.EmptyView
          icon="🔍"
          title="No snippets match your filter"
          description="Try adjusting your search terms or language filter"
        />
      )}

      {filteredSnippets.map((snippet) => (
        <List.Item
          key={snippet.id}
          title={snippet.name}
          subtitle={snippet.description || "No description"}
          accessories={[
            { 
              text: snippet.category, 
              icon: Icon.Tag,
              tooltip: `Category: ${snippet.category}`
            },
            { 
              text: snippet.language, 
              icon: getLanguageIcon(snippet.language),
              tooltip: `Language: ${snippet.language}`
            },
            { 
              text: `${snippet.usageCount || 0}`, 
              icon: Icon.Eye,
              tooltip: `Used ${snippet.usageCount || 0} times`
            }
          ]}
          actions={
            <ActionPanel>
              <ActionPanel.Section title="Quick Actions">
                <Action.CopyToClipboard
                  title="Copy Code"
                  icon={Icon.Clipboard}
                  content={snippet.code}
                  onCopy={() => handleCopySnippet(snippet)}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                <Action.Paste
                  title="Paste Code"
                  icon={Icon.Text}
                  content={snippet.code}
                  onPaste={() => handleCopySnippet(snippet)}
                  shortcut={{ modifiers: ["cmd"], key: "v" }}
                />
                <Action
                  title="Preview Code"
                  icon={Icon.Eye}
                  onAction={() => setShowingDetail(snippet.id)}
                  shortcut={{ modifiers: ["cmd"], key: "p" }}
                />
              </ActionPanel.Section>
              <ActionPanel.Section title="External Actions">
                <Action.OpenInBrowser 
                  title="Open in Notion"
                  icon={Icon.Globe}
                  url={`https://notion.so/${snippet.id.replace(/-/g, "")}`}
                  shortcut={{ modifiers: ["cmd"], key: "o" }}
                />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}