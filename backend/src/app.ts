import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import './api/database/database';
import { env } from './api/config/config';
import { routes } from './api/routes/routes';

const app = express();
const port = env.app.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public/home' });
})

app.get('/api', (req, res) => {
  res.sendFile('index.html', { root: 'public/api' });
})

app.use('/api', routes);

app.listen(process.env.PORT || port, () => {
  console.log(`Listening at port ${port}`);
})

export default app;
