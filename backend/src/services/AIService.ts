import { Configuration, OpenAIApi } from 'openai';

export class AIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeCode(code: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Analyze this code and provide suggestions for improvement:\n${code}`,
        max_tokens: 500,
        temperature: 0.7,
      });
      return response.data.choices[0].text || 'No suggestions available';
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw new Error('Failed to analyze code');
    }
  }

  async predictCodeQuality(code: string): Promise<number> {
    // Add machine learning model for code quality prediction
    // This is a placeholder implementation
    return 0.85;
  }
} 