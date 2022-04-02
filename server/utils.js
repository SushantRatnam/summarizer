import deepai from 'deepai';
import ytdl from 'ytdl-core';
import * as fs from 'fs';
import path, { format } from 'path';
import { Deepgram } from '@deepgram/sdk';
import ffmpeg from 'fluent-ffmpeg';

const DEEP_AI_KEY = process.env.DEEP_AI_KEY;
const DG_KEY = process.env.DG_KEY;
deepai.setApiKey(DEEP_AI_KEY);

export async function convertToText(location, videoId) {
  if (DG_KEY === undefined) {
    throw 'You must define DG_KEY in your .env file';
  }
  const mimetype = 'audio/mpeg';
  const deepgram = new Deepgram(DG_KEY);

  let source;
  const audio = fs.readFileSync(location);
  source = {
    buffer: audio,
    mimetype: mimetype,
  };

  const response = await deepgram.transcription
    .preRecorded(source, {
      punctuate: true,
    })
    .catch((err) => {
      console.log('error ======', err);
    });
  const text = response.results.channels[0].alternatives[0].transcript;
  const resp = await deepai.callStandardApi('summarization', { text });
  return {
    fullText: text,
    summarizedText: resp
  };
}

const ffmpegSync = (stream, storage_location) => {
  return new Promise((resolve, reject) => {
    ffmpeg(stream)
      .audioBitrate(128)
      .withAudioCodec('libmp3lame')
      .toFormat('mp3')
      .saveToFile(storage_location)
      .on('error', function (err) {
        console.log('error', err);
        return reject(new Error(err));
      })
      .on('end', function () {
        resolve({ success: true });
      });
  });
};

export const converToSummarizedText = async (link) => {
  const info = await ytdl.getInfo(link, { quality: 'highestaudio' });
  const converted_folder = path.join(path.resolve('./'), `store/audio`);
  if (!fs.existsSync(converted_folder)) {
    fs.mkdirSync(converted_folder);
  }
  const meta = info['player_response']['videoDetails'];
  const storage_location = path.join(converted_folder, `${meta['videoId']}.mp3`);

  // downloading and converting to mp3
  const stream = ytdl.downloadFromInfo(info, {
    quality: 'highestaudio',
  });
  const response = await ffmpegSync(stream, storage_location);
  if (response.success === true) {
    const textObj = await convertToText(storage_location, meta['videoId']);
    return textObj;
  }
};
