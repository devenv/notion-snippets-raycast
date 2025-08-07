import { ActionPanel, Action, Form, showToast, Toast, Detail, Icon } from "@raycast/api";
import { useState } from "react";

interface FormValues {
  databaseUrl: string;
}

export default function SetupHelper() {
  const [extractedId, setExtractedId] = useState<string>("");
  const [showingInstructions, setShowingInstructions] = useState(false);

  const extractDatabaseId = (url: string): string => {
    try {
      // Pattern: https://notion.so/workspace/DATABASE_ID?v=...
      // or https://www.notion.so/workspace/DATABASE_ID?v=...
      const match = url.match(/notion\.so\/[^\/]+\/([a-f0-9]{32})/i);
      if (match) {
        return match[1];
      }
      
      // Alternative pattern: https://notion.so/DATABASE_ID?v=...
      const directMatch = url.match(/notion\.so\/([a-f0-9]{32})/i);
      if (directMatch) {
        return directMatch[1];
      }
      
      return "";
    } catch (error) {
      return "";
    }
  };

  const handleSubmit = (values: FormValues) => {
    const id = extractDatabaseId(values.databaseUrl);
    if (id) {
      setExtractedId(id);
      showToast(Toast.Style.Success, "✅ Database ID extracted!", `Copy: ${id}`);
    } else {
      showToast(Toast.Style.Failure, "❌ Invalid URL", "Could not extract database ID from URL");
    }
  };

  if (showingInstructions) {
    return (
      <Detail
        markdown={`# 🚀 Notion Snippets Setup Guide

## Step 1: Create Notion Database

Create a new database in Notion with these **exact** property names:

| Property Name | Type | Description |
|---------------|------|-------------|
| **Name** | Title | Snippet title/name |
| **Code** | Text | The actual code snippet |
| **Language** | Select | Programming language |
| **Description** | Text | What the snippet does |
| **Category** | Select | Grouping (Utils, API, etc.) |
| **UsageCount** | Number | Track usage frequency |

⚠️ **Important**: Property names are case-sensitive and must match exactly!

## Step 2: Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.com/my-integrations)
2. Click **"New integration"**
3. Name it **"Raycast Snippets"**
4. Copy the **"Internal Integration Token"** (starts with \`secret_\`)
5. Click **"Submit"**

## Step 3: Share Database with Integration

1. Open your snippets database in Notion
2. Click the **"Share"** button (top right)
3. Click **"Add people, emails, groups, or integrations"**
4. Find and add your **"Raycast Snippets"** integration
5. Make sure it has **"Can edit"** permissions

## Step 4: Get Database ID

1. Open your database in a web browser
2. Copy the URL - it looks like:
   \`https://notion.so/workspace/DATABASE_ID?v=...\`
3. The **DATABASE_ID** is the 32-character string
4. Use the "Extract Database ID" tool in this extension!

## Step 5: Configure Extension

1. Open Raycast preferences for this extension
2. Enter your **Notion API Key** (from Step 2)
3. Enter your **Database ID** (from Step 4)
4. Set your preferred **default language**

## 🎉 You're Ready!

- Use **"Search Snippets"** to find and copy snippets
- Use **"Add Snippet"** to save new code snippets
- Snippets sync automatically with your Notion database

## 🛠️ Troubleshooting

**"Failed to fetch snippets"**
- Check your API key and database ID
- Ensure integration has database access
- Verify all required properties exist

**Properties not loading**
- Property names must match exactly (case-sensitive)
- Check spelling: Name, Code, Language, Description, Category, UsageCount
`}
        actions={
          <ActionPanel>
            <Action
              title="← Back to Helper"
              icon={Icon.ArrowLeft}
              onAction={() => setShowingInstructions(false)}
            />
            <Action.OpenInBrowser
              title="Open Notion Integrations"
              url="https://www.notion.com/my-integrations"
              icon={Icon.Globe}
            />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Extract Database ID">
            <Action.SubmitForm
              title="🔍 Extract Database ID"
              icon={Icon.MagnifyingGlass}
              onSubmit={handleSubmit}
            />
            {extractedId && (
              <Action.CopyToClipboard
                title="📋 Copy Database ID"
                content={extractedId}
                icon={Icon.Clipboard}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
            )}
          </ActionPanel.Section>
          <ActionPanel.Section title="Help">
            <Action
              title="📖 Setup Instructions"
              icon={Icon.Book}
              onAction={() => setShowingInstructions(true)}
              shortcut={{ modifiers: ["cmd"], key: "i" }}
            />
            <Action.OpenInBrowser
              title="🔗 Notion Integrations"
              url="https://www.notion.com/my-integrations"
              icon={Icon.Globe}
              shortcut={{ modifiers: ["cmd"], key: "o" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.Description
        title="🎯 Database ID Extractor"
        text="Paste your Notion database URL below to automatically extract the Database ID for your extension settings."
      />

      <Form.TextArea
        id="databaseUrl"
        title="📋 Notion Database URL"
        placeholder="https://notion.so/workspace/your-database-id?v=view-id"
        info="Paste the full URL of your Notion snippets database"
      />

      {extractedId && (
        <>
          <Form.Separator />
          <Form.Description
            title="✅ Extracted Database ID"
            text={extractedId}
          />
          <Form.Description
            title="📝 Next Steps"
            text="1. Copy the Database ID above
2. Open Raycast Extension Preferences
3. Paste it in the 'Database ID' field"
          />
        </>
      )}

      <Form.Separator />

      <Form.Description
        title="💡 Pro Tips"
        text="• URL should look like: notion.so/workspace/32-character-id?v=...
• Database ID is always 32 characters long
• Make sure your database has the required properties (see Setup Instructions)"
      />
    </Form>
  );
}