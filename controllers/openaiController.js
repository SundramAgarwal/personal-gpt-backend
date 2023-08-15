const dotenv = require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.AI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

exports.summaryController = async (req, res) => {
  try {
    const { data } = await openAi.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 1000,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.data.choices[0].text);
      }
    }
  } catch (error) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
