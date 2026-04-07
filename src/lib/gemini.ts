import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('GEMINI_API_KEY is missing. AI features will not work.');
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function analyzeComplexLog(logData: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `Analyze this system log and provide a root cause analysis and recommended fix:\n\n${logData}`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        systemInstruction: 'You are an expert DevOps engineer analyzing system logs for a Mission Control Panel. Provide concise, actionable insights.',
      }
    });
    return response.text;
  } catch (error) {
    console.error('Error analyzing log:', error);
    return 'Analysis failed.';
  }
}

export async function quickStatusCheck(statusQuery: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-preview',
      contents: statusQuery,
      config: {
        systemInstruction: 'You are a fast, helpful assistant for a Mission Control Panel. Provide very brief, direct answers.',
      }
    });
    return response.text;
  } catch (error) {
    console.error('Error checking status:', error);
    return 'Status check failed.';
  }
}
