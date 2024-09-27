const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getOpenAIResponse(location, wikipediaSummary) {
  try {
    const prompt = `Generate a succinct and interesting description of the following location for a tourist: ${location}. Here is a factual summary: ${wikipediaSummary}`;
    const response = await openai.createCompletion({
      model: 'gpt-4',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('Error generating OpenAI response:', error);
    return 'Could not generate description at this time.';
  }
}

module.exports = { getOpenAIResponse };
