import ytdl from 'ytdl-core';
import * as fs from 'fs';
import path from 'path';
import { Deepgram } from '@deepgram/sdk';

export async function convertToAudio(url, videoId) {
  ytdl(decodeURIComponent(url), {
    filter: (format) => format.itag === 140,
    quality: 'highestaudio',
  }).pipe(fs.createWriteStream(path.join(path.resolve('./'), `store/output/${videoId}.mp3`)));
}

export function convertToText(mp3Path) {
  const mimetype = 'audio/mpeg';
  const deepgram = new Deepgram(DG_KEY);
}

export function summarizeText() {}
