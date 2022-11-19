import express from 'express';
import * as path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './routes/index.js';
mongoose
  .connect('mongodb+srv://user1:root@cluster0.okilr.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connect mongoDB'))
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(cors());
app.use(express.json());

app.use('/static', express.static(path.resolve('src/static')));
app.use('/avatar', express.static(path.resolve('src/avatar')));
app.use('/', router);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) return console.log(err);
  console.log('Server started');
});
