const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this\n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (data && data.choices && data.choices[0] && data.choices[0].text) {
      const summary = data.choices[0].text;
      return res.status(200).json({ summary });
    } else {
      return res.status(500).json({
        message: "Failed to generate a summary.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error occurred while generating the summary.",
    });
  }
};

const paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detailed paragraph about\n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });

    if (data && data.choices && data.choices[0] && data.choices[0].text) {
      const generatedParagraph = data.choices[0].text;
      return res.status(200).json({ generatedParagraph });
    } else {
      return res.status(500).json({
        message: "Failed to generate a paragraph.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error occurred while generating the paragraph.",
    });
  }
};

const chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how Yoda from Star Wars would.
      Me: 'what is your name?'
      Yoda: 'Yoda is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 1,
    });

    if (data && data.choices && data.choices[0] && data.choices[0].text) {
      const generatedText = data.choices[0].text.trim(); // Extract the generated text

      // Remove prompt-like phrases (e.g., "Yoda:", "Me:", "ChatGPT:")
      const processedText = generatedText
        .replace(/(Yoda:|Me:|ChatGPT:)/g, "")
        .trim();

      return res.status(200).json({ generatedText: processedText }); // Send the processed generated text
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `/* convert these instructions into JavaScript code */\n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });

    if (data && data.choices && data.choices[0] && data.choices[0].text) {
      const generatedCode = data.choices[0].text;
      return res.status(200).json({ generatedCode });
    } else {
      return res.status(500).json({
        message: "No valid response from the AI model.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data && data.data && data.data[0] && data.data[0].url) {
      const imageUrl = data.data[0].url;
      return res.status(200).json({ imageUrl });
    } else {
      return res.status(500).json({
        message: "Failed to generate image.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "An error occurred while generating the image.",
    });
  }
};

module.exports = {
  scifiImageController,
  summaryController,
  jsconverterController,
  chatbotController,
  paragraphController,
};
