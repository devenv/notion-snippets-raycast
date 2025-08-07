import { ActionPanel, Action, Form, showToast, Toast, popToRoot, Icon, Clipboard } from "@raycast/api";
import { useState, useEffect } from "react";
import { addSnippet } from "./lib/notion";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  defaultLanguage: string;
}

interface FormValues {
  name: string;
  code: string;
  language: string;
  description: string;
  category: string;
}

export default function AddSnippet() {
  const preferences = getPreferenceValues<Preferences>();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>();
  const [codeError, setCodeError] = useState<string | undefined>();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    code: "",
    language: preferences.defaultLanguage,
    description: "",
    category: "",
  });

  // Try to populate code from clipboard on mount
  useEffect(() => {
    async function populateFromClipboard() {
      try {
        const clipboardText = await Clipboard.readText();
        if (clipboardText && clipboardText.trim() && clipboardText.includes('\n')) {
          // Looks like code (multiline), populate the form
          setFormValues(prev => ({ ...prev, code: clipboardText.trim() }));
          showToast(Toast.Style.Success, "📋 Code populated from clipboard!");
        }
      } catch (error) {
        // Clipboard read failed, ignore
      }
    }
    populateFromClipboard();
  }, []);

  const validateForm = (values: FormValues): boolean => {
    setNameError(undefined);
    setCodeError(undefined);

    let isValid = true;

    if (!values.name.trim()) {
      setNameError("Snippet name is required");
      isValid = false;
    } else if (values.name.trim().length < 3) {
      setNameError("Snippet name must be at least 3 characters");
      isValid = false;
    }

    if (!values.code.trim()) {
      setCodeError("Code is required");
      isValid = false;
    } else if (values.code.trim().length < 5) {
      setCodeError("Code must be at least 5 characters");
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit(values: FormValues) {
    if (!validateForm(values)) {
      showToast(Toast.Style.Failure, "❌ Please fix the errors above");
      return;
    }

    setLoading(true);
    try {
      await addSnippet({
        name: values.name.trim(),
        code: values.code.trim(),
        language: values.language || preferences.defaultLanguage,
        description: values.description?.trim() || "",
        category: values.category?.trim() || "General",
        usageCount: 0
      });

      showToast(Toast.Style.Success, "🎉 Snippet added successfully!");
      popToRoot();
    } catch (error) {
      showToast(Toast.Style.Failure, "❌ Failed to add snippet", String(error));
    } finally {
      setLoading(false);
    }
  }

  const handleFormChange = (field: keyof FormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (field === 'name') setNameError(undefined);
    if (field === 'code') setCodeError(undefined);
  };

  return (
    <Form
      isLoading={loading}
      actions={
        <ActionPanel>
          <ActionPanel.Section title="Form Actions">
            <Action.SubmitForm 
              title="✨ Add Snippet" 
              icon={Icon.Plus}
              onSubmit={handleSubmit}
              shortcut={{ modifiers: ["cmd"], key: "enter" }}
            />
            <Action
              title="📋 Paste from Clipboard"
              icon={Icon.Clipboard}
              onAction={async () => {
                try {
                  const clipboardText = await Clipboard.readText();
                  if (clipboardText && clipboardText.trim()) {
                    handleFormChange('code', clipboardText.trim());
                    showToast(Toast.Style.Success, "📋 Code pasted from clipboard!");
                  }
                } catch (error) {
                  showToast(Toast.Style.Failure, "❌ Failed to read clipboard");
                }
              }}
              shortcut={{ modifiers: ["cmd"], key: "v" }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="📝 Snippet Name"
        placeholder="e.g., React useState hook"
        info="Give your snippet a descriptive name (minimum 3 characters)"
        error={nameError}
        value={formValues.name}
        onChange={(value) => handleFormChange('name', value)}
      />

      <Form.TextArea
        id="code"
        title="💻 Code"
        placeholder="Paste your code here..."
        info="The actual code snippet (minimum 5 characters)"
        error={codeError}
        value={formValues.code}
        onChange={(value) => handleFormChange('code', value)}
      />

      <Form.Dropdown
        id="language"
        title="🌐 Language"
        value={formValues.language}
        onChange={(value) => handleFormChange('language', value)}
        info="Programming language for syntax highlighting"
      >
        <Form.Dropdown.Item value="javascript" title="🟨 JavaScript" />
        <Form.Dropdown.Item value="typescript" title="🔷 TypeScript" />
        <Form.Dropdown.Item value="python" title="🐍 Python" />
        <Form.Dropdown.Item value="react" title="⚛️ React" />
        <Form.Dropdown.Item value="css" title="🎨 CSS" />
        <Form.Dropdown.Item value="html" title="📄 HTML" />
        <Form.Dropdown.Item value="sql" title="🗄️ SQL" />
        <Form.Dropdown.Item value="shell" title="💻 Shell" />
        <Form.Dropdown.Item value="go" title="🚀 Go" />
        <Form.Dropdown.Item value="rust" title="⚙️ Rust" />
      </Form.Dropdown>

      <Form.TextField
        id="description"
        title="📋 Description"
        placeholder="What does this snippet do?"
        info="Brief description of the snippet's purpose (optional)"
        value={formValues.description}
        onChange={(value) => handleFormChange('description', value)}
      />

      <Form.TextField
        id="category"
        title="🏷️ Category"
        placeholder="e.g., Utils, API, Components"
        info="Category for organizing snippets (defaults to 'General')"
        value={formValues.category}
        onChange={(value) => handleFormChange('category', value)}
      />

      <Form.Separator />

      <Form.Description 
        title="💡 Pro Tips"
        text="• Use Cmd+V to paste code from clipboard
• Code will auto-populate if detected in clipboard
• Use descriptive names for better searchability
• Categories help organize your snippets"
      />
    </Form>
  );
}