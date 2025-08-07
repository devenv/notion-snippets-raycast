# Update the extension files to meet Raycast store requirements
import json

# Update package.json with proper store requirements
updated_package_json = """{
  "$schema": "https://www.raycast.com/schemas/extension.json",
  "name": "notion-snippets",
  "title": "Notion Snippets", 
  "description": "Manage and access code snippets stored in your Notion database with lightning-fast search and seamless team collaboration",
  "icon": "extension-icon.png",
  "author": "your-raycast-username",
  "categories": [
    "Developer Tools",
    "Productivity"
  ],
  "license": "MIT",
  "commands": [
    {
      "name": "search-snippets",
      "title": "Search Snippets",
      "subtitle": "Notion Snippets",
      "description": "Search and copy code snippets from your Notion database",
      "mode": "view",
      "keywords": [
        "code",
        "snippet", 
        "search",
        "notion"
      ]
    },
    {
      "name": "add-snippet", 
      "title": "Add Snippet",
      "subtitle": "Notion Snippets", 
      "description": "Add a new code snippet to your Notion database",
      "mode": "view",
      "keywords": [
        "add",
        "create",
        "snippet",
        "notion"
      ]
    }
  ],
  "preferences": [
    {
      "name": "notionApiKey",
      "type": "password",
      "required": true,
      "title": "Notion API Key",
      "description": "Your Notion integration secret token",
      "placeholder": "secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    {
      "name": "snippetDatabaseId",
      "type": "textfield",
      "required": true, 
      "title": "Snippet Database ID",
      "description": "The ID of your Notion snippets database (32-character string)",
      "placeholder": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    },
    {
      "name": "defaultLanguage",
      "type": "dropdown",
      "required": false,
      "title": "Default Language", 
      "description": "Default programming language for new snippets",
      "default": "javascript",
      "data": [
        {"title": "JavaScript", "value": "javascript"},
        {"title": "TypeScript", "value": "typescript"},
        {"title": "Python", "value": "python"},
        {"title": "React", "value": "react"},
        {"title": "CSS", "value": "css"},
        {"title": "HTML", "value": "html"},
        {"title": "SQL", "value": "sql"},
        {"title": "Shell", "value": "shell"},
        {"title": "Go", "value": "go"},
        {"title": "Rust", "value": "rust"}
      ]
    }
  ],
  "dependencies": {
    "@notionhq/client": "^2.2.3",
    "@raycast/api": "^1.83.1"
  },
  "devDependencies": {
    "@raycast/eslint-config": "^1.0.8",
    "@types/node": "20.8.10",
    "@types/react": "18.3.3",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "typescript": "^5.4.5"
  },
  "scripts": {
    "build": "ray build -e dist",
    "dev": "ray develop", 
    "fix-lint": "ray lint --fix",
    "lint": "ray lint",
    "prepublishOnly": "echo \\"\\n\\nIt seems like you are trying to publish the Raycast extension to npm.\\n\\nIf you did intend to publish it to npm, remove the \\\\\\"prepublishOnly\\\\\\" script and rerun \\\\\\"npm publish\\\\\\" again.\\nIf you wanted to publish it to the Raycast Store instead, use \\\\\\"npm run publish\\\\\\" instead.\\n\\n\\" && exit 1",
    "publish": "npx @raycast/api@latest publish"
  }
}"""

# Create additional required files
readme_content = """# Notion Snippets

Manage and access code snippets stored in your Notion database with lightning-fast search and seamless team collaboration.

## Features

- **Lightning Fast Search**: Instantly find and access your code snippets from Notion
- **Quick Copy & Paste**: Copy snippets to clipboard or paste directly to active applications
- **Easy Snippet Management**: Add new snippets with rich metadata through a clean form interface
- **Team Collaboration**: Share snippets across your team through a shared Notion database
- **Usage Tracking**: Automatically track snippet usage to surface most popular snippets first
- **Smart Organization**: Organize snippets by language, category, and description
- **Rich Metadata**: Store descriptions, categories, and usage examples alongside your code

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
2. Open any command to be prompted for configuration
3. Enter your Notion API Key and Database ID
4. Set your preferred default language

## Usage

### Search Snippets
- Use **"Search Snippets"** command
- Type to search by name, description, or language
- Press **Enter** to copy to clipboard
- Press **⌘+Enter** to paste directly to active app

### Add Snippets  
- Use **"Add Snippet"** command
- Fill out the form with code and metadata
- Press **⌘+Enter** to save to Notion

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
"""

changelog_content = """# Changelog

## [Initial] - {PR_MERGE_DATE}

- Initial release of Notion Snippets
- Search and filter code snippets from Notion database
- Copy snippets to clipboard with one keystroke
- Paste snippets directly to active applications  
- Add new snippets via clean form interface
- Language and category organization
- Usage count tracking for popular snippets
- Team collaboration through shared Notion workspace
- Configurable preferences for API keys and defaults
"""

# Create assets folder structure explanation
assets_info = """# Assets Required for Raycast Store

## Icon Requirements

**extension-icon.png**
- 512x512px PNG format
- Should look good in both light and dark themes
- Represents your extension's purpose (code/snippet management)
- Place in the root directory of your extension

## Screenshots (Optional but Recommended)

Create a `/metadata` folder with up to 6 screenshots:
- Use Raycast's "Window Capture" feature (⌃⌘⇧4 by default)
- Show your extension in action:
  1. Search interface with snippets
  2. Add snippet form
  3. Copy/paste functionality
  4. Different language filtering
- Name them: `screenshot-1.png`, `screenshot-2.png`, etc.
- Screenshots help users understand your extension's value

## Example Icon Ideas

For a code snippet manager, consider:
- Code brackets with Notion logo elements
- Snippet/document icon in Notion colors
- Abstract code representation
- Combination of search and code symbols

The icon should instantly convey "code snippets" to users browsing the store.
"""

# Save updated files
with open("raycast-notion-snippets/package.json", 'w') as f:
    f.write(updated_package_json)

with open("raycast-notion-snippets/README.md", 'w') as f:
    f.write(readme_content)

with open("raycast-notion-snippets/CHANGELOG.md", 'w') as f:
    f.write(changelog_content)

with open("raycast-notion-snippets/ASSETS_INFO.md", 'w') as f:
    f.write(assets_info)

print("✅ Updated extension for Raycast Store submission!")
print("\n📋 Store Requirements Checklist:")
print("   ✅ Updated package.json with proper schema and metadata")
print("   ✅ Added categories (Developer Tools, Productivity)")
print("   ✅ Included keywords for better discoverability") 
print("   ✅ Set proper subtitle for commands")
print("   ✅ Added comprehensive README.md")
print("   ✅ Created CHANGELOG.md with placeholder date")
print("   ✅ Set license to MIT")
print("   ✅ Used latest Raycast API version")
print("   ✅ Added proper command descriptions")

print("\n🎨 Still Needed:")
print("   ❌ extension-icon.png (512x512px)")
print("   ❌ Screenshots in /metadata folder (optional but recommended)")
print("   ❌ Update 'author' field with your actual Raycast username")

print("\n📤 Submission Process:")
print("   1. Create extension-icon.png (see ASSETS_INFO.md)")
print("   2. Update author field in package.json")
print("   3. Run `npm run build` to validate")
print("   4. Run `npm run publish` to submit to store")
print("   5. This opens a PR in raycast/extensions repository")
print("   6. Raycast team reviews within ~1 week")

print("\n💡 Pro Tips for Approval:")
print("   • Test thoroughly before submitting")
print("   • Follow the Extension Guidelines exactly")  
print("   • Add detailed setup instructions in README")
print("   • Include screenshots showing key functionality")
print("   • Respond quickly to reviewer feedback")
print("   • Join Raycast community Slack for faster support")