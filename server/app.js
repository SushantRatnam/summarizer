import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import { converToSummarizedText } from './utils.js';

//app config
const app = express();
app.use(morgan('dev'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.get('/uri', (req, res) => {
  (async function () {
    console.log('req.query', req.query);
    try {
      const summarizedText = await converToSummarizedText(req.query.youtubeUrl);
      res.json({
        summarizedText
      })
    } catch (error) {
      console.log(error);
    }
  })();
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
