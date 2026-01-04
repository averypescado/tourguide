import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../config';

export const getLocalInfo = async (latitude, longitude) => {
  // TEMPORARY: Hardcoded response to avoid rate limits
  // Comment this out and uncomment the API call below when ready
  // await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API delay
  // return "You're standing near the historic Golden Gate Bridge, an iconic suspension bridge that spans 1.7 miles across the Golden Gate strait. Completed in 1937, it was once the longest suspension bridge in the world. Fun fact: the bridge's distinctive orange color, called International Orange, was chosen to make it visible through San Francisco's famous fog!";

  // REAL API CALL - Uncomment when ready to use
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a local tour guide providing interesting, hyper-local information about specific locations. Tell me something interesting and hyper-local about the location at latitude ${latitude} and longitude ${longitude}. Include specific details about nearby landmarks, history, or unique facts. Keep your response under 100 words and make it engaging.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get local information');
  }
  
};
