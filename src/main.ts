import { HTTPWrapper } from './http';

const http = HTTPWrapper.getInstance();

const API_KEY = process.env.FEC_API_KEY;

const BASE_URL = 'https://api.open.fec.gov/v1';

const url = aUrl => `${ BASE_URL }${ aUrl }`;

const results = {

};

http.get(url('/candidate/H6VA10134'), { API_KEY, page: 1, sort: 'name' }).then(data => {
  results[data.committee_id] = data;
  console.log(data);  
})

