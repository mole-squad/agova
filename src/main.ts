import { HTTPWrapper } from './http';

const http = HTTPWrapper.getInstance();

http.get('https://google.com').then(data => {
  console.log(data);
})