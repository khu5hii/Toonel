import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/news', async (req, res) => {
    const url = `https://gnews.io/api/v4/search?q=gaming OR "indie music" OR "comics"&lang=en&max=20&apikey=${NEWS_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const filtered = data.articles.slice(0,9);

        res.json(filtered);
    } catch(error) {
        console.log('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});