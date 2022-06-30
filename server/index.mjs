import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';
import weatherRoute from './routes/weather.mjs';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 minutes
  max: 10,
});

app.use(limiter);
app.set('trust proxy', 1);

app.use('/api', weatherRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
