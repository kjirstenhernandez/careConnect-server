import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../dist')));

// Catch-all to serve index.html for SPA routes
app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Choose your port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
