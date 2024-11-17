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

    let dockerCommand = '';
    switch (language) {
        case 'python':
            dockerCommand = `docker build -t python-runner -f Dockerfile-python . && docker run --rm -e USER_CODE="${code}" python-runner`;
            break;
        case 'java':
            dockerCommand = `docker build -t java-runner -f Dockerfile-java . && docker run --rm -e USER_CODE="${code}" java-runner`;
            break;
        case 'cpp':
            dockerCommand = `docker build -t cpp-runner -f Dockerfile-cpp . && docker run --rm -e USER_CODE="${code}" cpp-runner`;
            break;
        case 'javascript':
            dockerCommand = `docker build -t js-runner -f Dockerfile-js . && docker run --rm -e USER_CODE="${code}" js-runner`;
            break;
        default:
            res.status(400).send('Language not supported yet');
            return;
    }

    exec(dockerCommand, (err, stdout, stderr) => {
        if (err) {
            console.error('Execution error:', err);
            return res.status(500).send(stderr || 'Error during code execution');
        }
        res.send(stdout);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
