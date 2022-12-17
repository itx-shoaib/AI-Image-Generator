const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateimage = async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: "Polar Bear on ice",
            n: 1,
            size: "512x512"
        });

        const imageurl = response.data.data[0].url

        res.status(200).json({
            success: true,
            data: imageurl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = { generateimage }