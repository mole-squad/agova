import { HTTPWrapper } from './http';
import * as fs from 'fs'

const http = HTTPWrapper.getInstance();

const API_KEY = process.env.FEC_API_KEY;

const BASE_URL = 'https://api.open.fec.gov/v1';

const url = aUrl => `${ BASE_URL }${ aUrl }`;

const results = {

};

let maxPages;

export function getPage(pageNumber) {
  const params = {
    api_key: API_KEY,
    cycle: 2016,
    office: 'P',
    per_page: 50,
    page: pageNumber,
    sort: 'name'
  };
  return http.get(url('/candidates/search'), params).then(data => {
    for (let i = 0; i < data.results.length; ++i) {
      results[data.results[i].candidate_id] = data.results[i];
    }
    if(!maxPages) {
      maxPages = data.pagination.pages;
    }
    if(pageNumber === maxPages) {
      fs.writeFileSync('./presidential-candidates-2016.json', JSON.stringify(results));
    }
  })
};

export function main() {
  getPage(1).then( () => {
    for (let i = 2; i <= maxPages; ++i) {
      getPage(i);
    }
  })
};
