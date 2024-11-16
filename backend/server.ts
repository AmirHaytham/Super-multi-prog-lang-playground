import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { exec } from 'child_process';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle code submission
app.post('/api/execute', (req, res) => {
    const { language, code } = req.body;

    if (language === 'python') {
        // Run the Docker container for Python
        exec(
            `docker build -t python-runner -f Dockerfile-python . && docker run --rm -e USER_CODE="${code}" python-runner`,
            (err, stdout, stderr) => {
                if (err) {
                    console.error('Execution error:', err);
                    return res.status(500).send(stderr || 'Error during code execution');
                }
                res.send(stdout);
            }
        );
    } else {
        res.status(400).send('Language not supported yet');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
