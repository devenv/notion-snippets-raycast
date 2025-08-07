import { Client } from "@notionhq/client";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  notionApiKey: string;
  snippetDatabaseId: string;
}

export interface Snippet {
  id: string;
  name: string;
  code: string;
  language: string;
  description: string;
  category: string;
  usageCount?: number;
  createdAt: string;
}

const getNotionClient = () => {
  const preferences = getPreferenceValues<Preferences>();
  return new Client({ auth: preferences.notionApiKey });
};

export async function getSnippets(): Promise<Snippet[]> {
  const notion = getNotionClient();
  const preferences = getPreferenceValues<Preferences>();

  // Validate preferences
  if (!preferences.notionApiKey || !preferences.snippetDatabaseId) {
    throw new Error("Please configure your Notion API Key and Database ID in extension preferences (⌘+,)");
  }

  if (preferences.snippetDatabaseId.length !== 32) {
    throw new Error("Database ID must be exactly 32 characters. Use the Setup Helper to extract it from your database URL.");
  }

  try {
    const response = await notion.databases.query({
      database_id: preferences.snippetDatabaseId,
      sorts: [
        {
          property: "UsageCount",
          direction: "descending"
        }
      ]
    });

    const snippets: Snippet[] = [];

    for (const page of response.results) {
      if ('properties' in page) {
        const properties = page.properties;

        // Extract properties safely
        const name = extractTitle(properties.Name);
        const code = extractRichText(properties.Code);
        const language = extractSelect(properties.Language);
        const description = extractRichText(properties.Description);
        const category = extractSelect(properties.Category);
        const usageCount = extractNumber(properties.UsageCount);

        snippets.push({
          id: page.id,
          name,
          code,
          language,
          description,
          category,
          usageCount,
          createdAt: 'created_time' in page ? page.created_time : new Date().toISOString()
        });
      }
    }

    return snippets;
  } catch (error) {
    throw new Error(`Failed to fetch snippets: ${error}`);
  }
}

export async function addSnippet(snippet: Omit<Snippet, 'id' | 'createdAt'>) {
  const notion = getNotionClient();
  const preferences = getPreferenceValues<Preferences>();

  // Validate preferences
  if (!preferences.notionApiKey || !preferences.snippetDatabaseId) {
    throw new Error("Please configure your Notion API Key and Database ID in extension preferences (⌘+,)");
  }

  if (preferences.snippetDatabaseId.length !== 32) {
    throw new Error("Database ID must be exactly 32 characters. Use the Setup Helper to extract it from your database URL.");
  }

  try {
    await notion.pages.create({
      parent: {
        database_id: preferences.snippetDatabaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: snippet.name,
              },
            },
          ],
        },
        Code: {
          rich_text: [
            {
              text: {
                content: snippet.code,
              },
            },
          ],
        },
        Language: {
          select: {
            name: snippet.language,
          },
        },
        Description: {
          rich_text: [
            {
              text: {
                content: snippet.description,
              },
            },
          ],
        },
        Category: {
          select: {
            name: snippet.category,
          },
        },
        UsageCount: {
          number: snippet.usageCount || 0,
        },
      },
    });
  } catch (error) {
    throw new Error(`Failed to add snippet: ${error}`);
  }
}

export async function updateUsageCount(pageId: string, newCount: number) {
  const notion = getNotionClient();
  const preferences = getPreferenceValues<Preferences>();

  // Validate preferences
  if (!preferences.notionApiKey) {
    throw new Error("Please configure your Notion API Key in extension preferences (⌘+,)");
  }

  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        UsageCount: {
          number: newCount,
        },
      },
    });
  } catch (error) {
    throw new Error(`Failed to update usage count: ${error}`);
  }
}

// Helper functions to safely extract data from Notion properties
function extractTitle(property: any): string {
  if (property?.type === 'title' && property.title) {
    return property.title.map((t: any) => t.plain_text).join('');
  }
  return '';
}

function extractRichText(property: any): string {
  if (property?.type === 'rich_text' && property.rich_text) {
    return property.rich_text.map((t: any) => t.plain_text).join('');
  }
  return '';
}

function extractSelect(property: any): string {
  if (property?.type === 'select' && property.select) {
    return property.select.name || '';
  }
  return '';
}

function extractNumber(property: any): number {
  if (property?.type === 'number' && typeof property.number === 'number') {
    return property.number;
  }
  return 0;
}