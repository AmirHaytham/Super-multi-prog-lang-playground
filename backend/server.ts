import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle message submission from frontend
app.post('/api/message', (req, res) => {
    const { message } = req.body;
    console.log('Received message from frontend:', message);
    res.send(`Message received: ${message}`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
