import express from 'express';
import { connectDB } from './db';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api', authRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));


async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
