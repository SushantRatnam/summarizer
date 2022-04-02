import deepai from 'deepai';
import ytdl from 'ytdl-core';
import * as fs from 'fs';
import path, { format } from 'path';
import { Deepgram } from '@deepgram/sdk';
import ffmpeg from 'fluent-ffmpeg';
import http from "https";
import mtd from "zeltice-mt-downloader";
import url from "url";

const DEEP_AI_KEY = process.env.DEEP_AI_KEY;
const DG_KEY = process.env.DG_KEY;
deepai.setApiKey(DEEP_AI_KEY);

export async function download1() {
  const file = fs.createWriteStream("file.mp4");
  const request = http.get("https://rr1---sn-ci5gup-cagk.googlevideo.com/videoplayback?expire=1648932539&ei=W2JIYrv8B5Kyz7sP7Yyj8Ao&ip=122.171.241.229&id=o-AKxZAP6OIRm0gI36vSk5rVXVARg_FBIo8C_nTKCm2rnu&itag=140&source=youtube&requiressl=yes&mh=cd&mm=31%2C29&mn=sn-ci5gup-cagk%2Csn-ci5gup-h556&ms=au%2Crdu&mv=m&mvi=1&pcm2cms=yes&pl=20&initcwndbps=1288750&spc=4ocVC3EPj7XRTnvVu3wz9pW7G4uF&vprv=1&mime=audio%2Fmp4&ns=wZVSWk0OG2tP5UFEAGGgUmsG&gir=yes&clen=13656178&dur=843.766&lmt=1600954997249945&mt=1648910456&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=kYoAizfdx6T37Vwzu&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJTKtkh3XMCvpirqAyFXjNHUzwnzBwr8U_NlCUVLHCJgCIC_zzdQ8cwbnGrLFin9FZgW9YHaIZdbxtF95vj2yrnv6&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKgARlLwu7mYb4CPqo3zHZKX1trHyyETLio931dMEhhdAiEArOwMT-IpPEcH-Cvgaf-8m8-8AvjsNhEriIQUlFsqhmI%3D", function(response) {
  response.pipe(file);
   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});
}

export async function download(target_url) {
  console.log("Started")
  console.time()
  var target_url = "https://rr1---sn-ci5gup-cagk.googlevideo.com/videoplayback?expire=1648932539&ei=W2JIYrv8B5Kyz7sP7Yyj8Ao&ip=122.171.241.229&id=o-AKxZAP6OIRm0gI36vSk5rVXVARg_FBIo8C_nTKCm2rnu&itag=140&source=youtube&requiressl=yes&mh=cd&mm=31%2C29&mn=sn-ci5gup-cagk%2Csn-ci5gup-h556&ms=au%2Crdu&mv=m&mvi=1&pcm2cms=yes&pl=20&initcwndbps=1288750&spc=4ocVC3EPj7XRTnvVu3wz9pW7G4uF&vprv=1&mime=audio%2Fmp4&ns=wZVSWk0OG2tP5UFEAGGgUmsG&gir=yes&clen=13656178&dur=843.766&lmt=1600954997249945&mt=1648910456&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=kYoAizfdx6T37Vwzu&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJTKtkh3XMCvpirqAyFXjNHUzwnzBwr8U_NlCUVLHCJgCIC_zzdQ8cwbnGrLFin9FZgW9YHaIZdbxtF95vj2yrnv6&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKgARlLwu7mYb4CPqo3zHZKX1trHyyETLio931dMEhhdAiEArOwMT-IpPEcH-Cvgaf-8m8-8AvjsNhEriIQUlFsqhmI%3D"
var file_name = path.basename(url.parse(target_url).pathname)
var file_path = path.join("/Users/sudpda/Sushant/summarizer/resources", file_name)
var downloader = new mtd(file_path, target_url)
downloader.start()
console.timeEnd()
}

export async function convertToText() {
  console.log("Entered")
  if (DG_KEY === undefined) {
    throw 'You must define DG_KEY in your .env file';
  }
  const mimetype = 'audio/mp4';
  const deepgram = new Deepgram(DG_KEY);

  // let source = {
    // url : 'https://rr1---sn-ci5gup-cagk.googlevideo.com/videoplayback?expire=1648932539&ei=W2JIYrv8B5Kyz7sP7Yyj8Ao&ip=122.171.241.229&id=o-AKxZAP6OIRm0gI36vSk5rVXVARg_FBIo8C_nTKCm2rnu&itag=140&source=youtube&requiressl=yes&mh=cd&mm=31%2C29&mn=sn-ci5gup-cagk%2Csn-ci5gup-h556&ms=au%2Crdu&mv=m&mvi=1&pcm2cms=yes&pl=20&initcwndbps=1288750&spc=4ocVC3EPj7XRTnvVu3wz9pW7G4uF&vprv=1&mime=audio%2Fmp4&ns=wZVSWk0OG2tP5UFEAGGgUmsG&gir=yes&clen=13656178&dur=843.766&lmt=1600954997249945&mt=1648910456&fvip=5&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=kYoAizfdx6T37Vwzu&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgJTKtkh3XMCvpirqAyFXjNHUzwnzBwr8U_NlCUVLHCJgCIC_zzdQ8cwbnGrLFin9FZgW9YHaIZdbxtF95vj2yrnv6&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKgARlLwu7mYb4CPqo3zHZKX1trHyyETLio931dMEhhdAiEArOwMT-IpPEcH-Cvgaf-8m8-8AvjsNhEriIQUlFsqhmI%3D'
  // }
  const location = "/Users/sudpda/Sushant/summarizer/resources/videoplayback.mp4"
  const audio = fs.readFileSync(location);
  const source = {
    buffer: audio,
    mimetype: mimetype,
  };
  console.time()
  const response = await deepgram.transcription
    .preRecorded(source, {
      punctuate: true,
    })
    .catch((err) => {
      console.log('error ======', err);
    });
    console.timeEnd()
    console.log('resp', response)
  const text = response.results.channels[0].alternatives[0].transcript;
  console.log('text', text)
  // const resp = await deepai.callStandardApi('summarization', { text });
  // return {
    // fullText: text,
    // summarizedText: resp
  // };
}

// const ffmpegSync = (stream, storage_location) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg(stream)
//       .audioBitrate(128)
//       .withAudioCodec('libmp3lame')
//       .toFormat('mp3')
//       .saveToFile(storage_location)
//       .on('error', function (err) {
//         console.log('error', err);
//         return reject(new Error(err));
//       })
//       .on('end', function () {
//         resolve({ success: true });
//       });
//   });
// };

// export const converToSummarizedText = async (link) => {
//   const info = await ytdl.getInfo(link, { quality: 'highestaudio' });
//   const converted_folder = path.join(path.resolve('./'), `store/audio`);
//   if (!fs.existsSync(converted_folder)) {
//     fs.mkdirSync(converted_folder);
//   }
//   const meta = info['player_response']['videoDetails'];
//   const storage_location = path.join(converted_folder, `${meta['videoId']}.mp3`);

//   // downloading and converting to mp3
//   const stream = ytdl.downloadFromInfo(info, {
//     quality: 'highestaudio',
//   });
//   const response = await ffmpegSync(stream, storage_location);
//   if (response.success === true) {
//     const textObj = await convertToText(storage_location, meta['videoId']);
//     return textObj;
//   }
// };
