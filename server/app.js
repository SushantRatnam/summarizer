import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import { convertToText } from './utils.js';
import { download } from './utils.js';
//app config
const app = express();
app.use(morgan('dev'));
app.use(cors('*'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

(async function () {
      try {
        // const textObj = await convertToText();
        const down = await download();
      } catch (error) {
        console.log(error);
      }
    })();


// app.get('/uri', (req, res) => {
//   (async function () {
//     console.log('req.query', req.query);
//     try {
//       const textObj = await converToSummarizedText(req.query.youtubeUrl);
//       res.json({
//         textObj
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   })();
// });

app.listen(PORT, () => {
  console.log(`Server started at port:${PORT}`)

});
