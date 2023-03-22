import axios from 'axios';

export default async function imgToBase64(url: string) {
  const promise = await axios.get(`${url}`, { responseType: 'arraybuffer' });
  const base64string = await Buffer.from(promise.data).toString('base64');
  return base64string;
}
