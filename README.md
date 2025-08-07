# 📝 Notion Snippets

A Raycast extension for managing code snippets stored in your Notion database with search functionality and team collaboration.

![Raycast Extension](https://img.shields.io/badge/Raycast-Extension-red)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)

## ✨ Features

- **🔍 Search & Filter**: Find code snippets by name, description, or programming language
- **📋 Copy & Paste**: Copy snippets to clipboard or paste directly to active applications  
- **➕ Add Snippets**: Create new snippets with metadata through a clean form interface
- **👥 Team Collaboration**: Share snippets across your team using a shared Notion database
- **📊 Usage Tracking**: Track snippet usage to identify frequently used code
- **🏷️ Organization**: Organize snippets by language, category, and description
- **📝 Metadata Support**: Store descriptions, categories, and usage examples with your code
- **🔍 Code Preview**: Preview snippets with syntax highlighting before copying
- **🛠️ Setup Helper**: Guided setup with database ID extraction from Notion URLs
- **⌨️ Keyboard Shortcuts**: Standard shortcuts for common actions (⌘+C, ⌘+P, ⌘+V, etc.)

## 📋 What You Need

### For Personal Use
- A Notion account (free or paid)
- Raycast installed on your Mac

### For Team Use
- A Notion workspace where you can create databases
- Admin access to share databases with integrations
- Each team member needs Raycast installed

## 🚀 Quick Setup

### 1. Create the Snippets Database

Create a new database in your Notion workspace with these **exact** property names:

| Property Name | Type | Description |
|---------------|------|-------------|
| Name | Title | Snippet title/name |
| Code | Text | The actual code snippet |
| Language | Select | Programming language |
| Description | Text | What the snippet does |
| Category | Select | Grouping (Utils, API, etc.) |
| UsageCount | Number | Track usage frequency |

### 2. Get Your Database ID

1. Open your database in a web browser
2. Copy the URL - it looks like: `https://notion.so/workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the 32-character string between workspace name and `?v=`

💡 **Tip**: Use the extension's "Setup Helper" command to extract this automatically.

### 3. Set Up API Access

**Each team member** needs to do this individually:

1. Go to [Notion Integrations](https://www.notion.com/my-integrations)
2. Click "New integration"
3. Name it "Raycast Snippets" (or your preferred name)
4. Copy the "Internal Integration Token" (starts with `secret_...`)
5. Click "Submit"

### 4. Share Database Access

**Database owner** shares the database with each team member's integration:

1. Open your snippets database in Notion
2. Click the "Share" button (top right)
3. Click "Add people, emails, groups, or integrations"
4. Add each team member's integration by name
5. Set permissions to "Can edit"

### 5. Configure the Extension

**Each team member** configures their Raycast extension:

1. Install the "Notion Snippets" extension from Raycast Store
2. Use the "Setup Helper" command for guided configuration
3. Enter your personal API Key and the shared Database ID
4. Set your preferred default language

## 📖 Usage

### 🔍 Search Snippets
- Use the "Search Snippets" command
- Search by name, description, or language
- Filter by programming language using the dropdown
- **⌘+C** - Copy code to clipboard
- **⌘+V** - Paste code directly to active app  
- **⌘+P** - Preview code with syntax highlighting
- **⌘+O** - Open snippet in Notion

### ➕ Add Snippets  
- Use the "Add Snippet" command
- Code auto-populates from clipboard if detected
- **⌘+V** - Paste code from clipboard
- **⌘+Enter** - Save snippet to Notion
- Form includes validation and error messages

### 🛠️ Setup & Configuration
- Use the "Setup Helper" command for guided setup
- Extract Database ID from Notion URLs
- Access setup instructions and troubleshooting

## 👥 Team Management

### What Each Role Does

**🏢 Database Owner (Team Lead/Admin)**
- Creates and maintains the snippets database
- Shares database access with team integrations
- Can organize categories and clean up old snippets

**👤 Team Members**
- Create their own Notion integration (personal API key)
- Configure the extension with shared Database ID
- Add, search, and use team snippets

### Team Best Practices

- **Categories**: Use consistent categories like "API", "Utils", "Components"
- **Naming**: Use descriptive names for easy searching
- **Languages**: Specify programming languages for better filtering
- **Descriptions**: Add clear descriptions for complex snippets

## 🔒 Privacy & Security

- Notion API keys are stored securely in Raycast's encrypted preferences
- Communication occurs directly between Raycast and Notion's API
- No data is sent to third parties
- Extension source code is publicly available

## 🔧 Troubleshooting

### Common Issues

**"Failed to fetch snippets"**
- Verify your API key and database ID in extension preferences
- Ensure your integration has access to the database (check sharing settings)
- Confirm all required database properties exist with exact names

**"Permission denied" errors**
- Database owner needs to share database with your integration
- Check that your integration has "Can edit" permissions
- Verify you're using the correct Database ID

**Properties not loading**
- Property names are case-sensitive: `Name`, `Code`, `Language`, `Description`, `Category`, `UsageCount`
- All properties must exist in the database before using the extension

### Getting Help

- Use the "Setup Helper" command for guided troubleshooting
- Check the database sharing settings in Notion
- For technical issues, open an issue on GitHub
