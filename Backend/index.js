import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import axios from "axios";
import adminAuthRoute from './routes/admin/auth.js'
import clientRoutes from "./routes/admin/client.js";
import generalRoutes from "./routes/admin/general.js";
import managementRoutes from "./routes/admin/management.js";
import salesRoutes from "./routes/admin/sales.js";

import authRoute from './routes/client/auth.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/admin-auth", adminAuthRoute);
app.use("/auth", authRoute);
app.use("/general", generalRoutes);

app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

// Your OpenAI API key
const API_KEY = process.env.OPENAI_API_KEY;

// OpenAI API endpoint
const API_URL = process.env.API_URL;

async function callChatGPTWithStreaming() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Tell me a story.' }
        ],
        stream: true,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream', // This is crucial for streaming data
      }
    );

    // Process the streaming response
    let fullMessage = '';
    response.data.on('data', (chunk) => {
      // Convert chunk to string and process it
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line === 'data: [DONE]') {
          // End of the stream
          console.log('\nStreaming complete.');
          return;
        }

        if (line.startsWith('data: ')) {
          try {
            const json = JSON.parse(line.substring(6)); // Extract JSON payload
            if (json.choices && json.choices[0].delta && json.choices[0].delta.content) {
              const content = json.choices[0].delta.content;
              fullMessage += content; // Append to the full message
              process.stdout.write(content); // Optionally log to console in real-time
            }
          } catch (err) {
            console.error('Error parsing JSON line:', line, err);
          }
        }
      }
    });

    response.data.on('end', () => {
      console.log('\nFinal Message:', fullMessage);
    });


  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// callChatGPTWithStreaming();

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Invalid request body. "messages" must be an array.' });
  }

  try {
    const response = await axios.post(API_URL, {
      model: 'gpt-4', // or 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: messages }
      ],
      stream: true, // Enable streaming
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      responseType: 'stream', // Indicate that response is a stream
    });

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let fullMessage = '';
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line === 'data: [DONE]') {
          res.write('\n'); // Send a newline to indicate end of streaming
          res.end(); // Close the response
          return;
        }

        if (line.startsWith('data: ')) {
          try {
            const json = JSON.parse(line.substring(6)); // Extract JSON payload
            if (json.choices && json.choices[0].delta && json.choices[0].delta.content) {
              const content = json.choices[0].delta.content;
              fullMessage += content; // Append to the full message
              process.stdout.write(content); // Optionally log to console in real-time
              res.write(content); // Stream content to the frontend
            }
          } catch (err) {
            console.error('Error parsing JSON line:', line, err);
          }
        }
      }
    });

    response.data.on('end', () => {
      console.log('Streaming complete. Final message:', fullMessage);
    });

    response.data.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).send('Error streaming data from OpenAI.');
    });

  } catch (error) {
    console.error('Error with ChatGPT API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from OpenAI.' });
  }
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
