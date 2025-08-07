# 🚀 Notion Snippets

Manage and access code snippets stored in your Notion database with lightning-fast search and seamless team collaboration.

![Raycast Extension](https://img.shields.io/badge/Raycast-Extension-red)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)

## ✨ Features

- **⚡ Lightning Fast Search**: Instantly find and access your code snippets from Notion
- **📋 Quick Copy & Paste**: Copy snippets to clipboard or paste directly to active applications  
- **➕ Easy Snippet Management**: Add new snippets with rich metadata through a clean form interface
- **👥 Team Collaboration**: Share snippets across your team through a shared Notion database
- **📊 Usage Tracking**: Automatically track snippet usage to surface most popular snippets first
- **🏷️ Smart Organization**: Organize snippets by language, category, and description
- **📝 Rich Metadata**: Store descriptions, categories, and usage examples alongside your code
- **🔍 Code Preview**: Preview snippets with syntax highlighting before copying
- **🛠️ Setup Helper**: Built-in setup guide and database ID extractor for easy configuration
- **⌨️ Keyboard Shortcuts**: Intuitive shortcuts for all actions (⌘+C to copy, ⌘+P to preview, etc.)

## Setup

### 1. Create Notion Database

Create a Notion database with these exact property names:

| Property Name | Type | Description |
|---------------|------|-------------|
| Name | Title | Snippet title/name |
| Code | Text | The actual code snippet |
| Language | Select | Programming language |
| Description | Text | What the snippet does |
| Category | Select | Grouping (Utils, API, etc.) |
| UsageCount | Number | Track usage frequency |

### 2. Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.com/my-integrations)
2. Click "New integration"
3. Name it "Raycast Snippets"
4. Copy the "Internal Integration Token"
5. Click "Submit"

### 3. Share Database with Integration

1. Open your snippets database in Notion
2. Click the "Share" button (top right)
3. Click "Add people, emails, groups, or integrations"
4. Find and add your "Raycast Snippets" integration
5. Make sure it has "Can edit" permissions

### 4. Get Database ID

1. Open your database in a web browser
2. Copy the URL - it looks like: `https://notion.so/workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the 32-character string between workspace name and `?v=`

### 5. Configure Extension

1. Install the extension from Raycast Store
2. Use the **"Setup Helper"** command for guided configuration
3. Enter your Notion API Key and Database ID (use the helper to extract Database ID from URL)
4. Set your preferred default language

💡 **Pro Tip**: Use the Setup Helper command to extract your Database ID automatically from your Notion database URL!

## 🎯 Usage

### 🔍 Search Snippets
- Use **"Search Snippets"** command
- Type to search by name, description, or language
- Filter by programming language using the dropdown
- **⌘+C** - Copy code to clipboard
- **⌘+V** - Paste code directly to active app  
- **⌘+P** - Preview code with syntax highlighting
- **⌘+O** - Open snippet in Notion

### ➕ Add Snippets  
- Use **"Add Snippet"** command
- Code auto-populates from clipboard if detected
- **⌘+V** - Paste code from clipboard manually
- **⌘+Enter** - Save snippet to Notion
- Form includes validation and helpful tips

### 🛠️ Setup & Configuration
- Use **"Setup Helper"** command for guided setup
- Extract Database ID from Notion URL automatically
- Complete setup instructions and troubleshooting guide

## Team Collaboration

This extension works perfectly for team snippet sharing:

1. Create a shared workspace in Notion
2. Set up the snippets database in the shared workspace
3. Each team member creates their own integration
4. Share the database with all team member integrations
5. Everyone can now add, search, and use shared snippets

## Privacy & Security

- Your Notion API key is stored securely in Raycast's encrypted preferences
- All communication happens directly between Raycast and Notion's API
- No data is sent to third parties
- The extension is fully open source

## Troubleshooting

**"Failed to fetch snippets"**
- Check your API key and database ID in extension preferences
- Ensure the integration has access to the database
- Verify all required database properties exist with exact names

**Properties not loading**
- Ensure all required properties exist in your Notion database
- Property names are case-sensitive and must match exactly

For more help, open an issue on GitHub or reach out on the Raycast community.
