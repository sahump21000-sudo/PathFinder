import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, CareerPath } from "../types";

const apiKey = process.env.API_KEY;

// Using gemini-3-pro-preview for best reasoning and search capabilities
const MODEL_NAME = "gemini-3-pro-preview";

export const generateCareerPaths = async (profile: UserProfile): Promise<{ paths: CareerPath[], rawText: string }> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const locationContext = profile.locationScope === 'State Specific' 
    ? `SPECIFICALLY FOCUS ON JOBS IN THE STATE OF: ${profile.targetState}. Include State PSCs, local govt bodies, and private companies in this region.` 
    : "Focus on ALL INDIA level opportunities (Central Govt, MNCs).";

  const domainContext = profile.targetDomains.length > 0 
    ? `User is specifically interested in: ${profile.targetDomains.join(', ')}.`
    : "User is open to all domains.";

  const prompt = `
    Act as a senior career strategist. The user needs a highly detailed career roadmap.
    
    User Profile:
    - Education: ${profile.level}
    - Stream: ${profile.stream}
    - Subjects: ${profile.subjects}
    - Interest Areas: ${domainContext}
    - Sector Preference: ${profile.preference}
    - Location Preference: ${locationContext}
    - Salary Expectation: ${profile.salaryExpectation}

    YOUR MISSION:
    1. Generate a **Massive List (15-20 jobs)**.
    2. **STRICTLY FOLLOW SECTOR PREFERENCE**: 
       - If 'Government Only', DO NOT show private jobs.
       - If 'Private Only', DO NOT show government jobs.
       - If 'Both', provide a mix.
    3. **MANDATORY CATEGORIZATION**: You must classify every job into exactly one of these 3 categories:
       - **"High Competition"**: Prestigious, very difficult, elite exams (e.g., UPSC, Top MNCs, NDA). High reward but very hard.
       - **"Moderate Competition"**: Good jobs, accessible with effort, stable (e.g., Bank PO, SSC, Standard Dev roles).
       - **"Hidden Gem"**: Underrated, low competition, specific niche skills, but good career potential.
    
    4. **Specifics**: 
       - For Army/Police: Mention specific ranks/entries (e.g., SSC CPO, Constable, NDA).
       - For Banks: Mention IBPS/SBI.
       - Include source URLs and official websites.

    Output Format:
    Return a JSON array of career paths strictly adhering to this schema:
    [
      {
        "title": "Job Title (e.g. IAS Officer, Software Engineer)",
        "sector": "Government" | "Private",
        "category": "High Competition" | "Moderate Competition" | "Hidden Gem",
        "description": "Short professional summary",
        "eligibility": "Detailed eligibility",
        "competitionLevel": "Detailed Stats (e.g. 10 Lakh applicants for 500 seats)",
        "estimatedApplicants": "Number string",
        "hiddenGem": boolean, // true if category is Hidden Gem
        "officialWebsite": "https://...",
        "averageSalary": "e.g. 8-12 LPA"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 2048 }, 
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              sector: { type: Type.STRING },
              category: { type: Type.STRING, enum: ["High Competition", "Moderate Competition", "Hidden Gem"] },
              description: { type: Type.STRING },
              eligibility: { type: Type.STRING },
              competitionLevel: { type: Type.STRING },
              estimatedApplicants: { type: Type.STRING },
              hiddenGem: { type: Type.BOOLEAN },
              officialWebsite: { type: Type.STRING },
              averageSalary: { type: Type.STRING },
            },
            required: ["title", "sector", "category", "description", "hiddenGem"]
          }
        }
      },
    });

    const text = response.text || "[]";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    let paths: CareerPath[] = [];
    try {
      paths = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON", e);
      const match = text.match(/```json\n([\s\S]*?)\n```/);
      if (match) {
        paths = JSON.parse(match[1]);
      }
    }

    const allSources = groundingChunks
      .map((chunk: any) => chunk.web?.uri)
      .filter((uri: string | undefined): uri is string => !!uri);

    paths = paths.map((p, index) => ({
      ...p,
      id: `job-${index}`,
      sourceUrls: allSources.slice(0, 8)
    }));

    return { paths, rawText: text };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};