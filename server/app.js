import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import * as fs from 'fs';
import { Deepgram } from '@deepgram/sdk';
import deepai from 'deepai';

//app config
const app = express();
app.use(morgan('dev'));
const PORT = process.env.PORT || 3000;
const DG_KEY = process.env.DG_KEY;
const DEEP_AI_KEY = process.env.DEEP_AI_KEY;

const file = 'test/test-file.mp3';
const mimetype = 'audio/mpeg';

const deepgram = new Deepgram(DG_KEY);
deepai.setApiKey(DEEP_AI_KEY);
let source;
if (file.startsWith('http')) {
  // File is remote
  // Set the source
  source = {
    url: file,
  };
} else {
  // File is local
  // Open the audio file
  const audio = fs.readFileSync(file);

  // Set the source
  source = {
    buffer: audio,
    mimetype: mimetype,
  };
}

deepgram.transcription
  .preRecorded(source, {
    punctuate: true,
  })
  .then((response) => {
    // Write the response to the console
    // console.dir(response, { depth: null });

    // Write only the transcript to the console
    const text = response.results.channels[0].alternatives[0].transcript;
    // console.log(text);
    try {
      fs.writeFileSync('test/full.txt', text);
    } catch (error) {
      console.log(error);
    }
    (async function () {
      var resp = await deepai.callStandardApi('summarization', {
        text,
      });
        try {
          console.dir(resp)
        fs.writeFileSync('test/summarized.txt', resp.output);
      } catch (error) {
        console.log(error);
      }
    })();
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('<h1>HI</h1>');
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));
