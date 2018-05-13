import * as fs from 'fs'

import { API_KEY, FECUrl as url } from './fec';
import { HTTPWrapper } from '../lib/http';

const http = HTTPWrapper.getInstance();
const results = {};

let maxPages;

function getPage(pageNumber: number, year: number) {
  const params = {
    api_key: API_KEY,
    cycle: year,
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

export function getCandidates(year) {
  getPage(1, year).then( () => {
    for (let i = 2; i <= maxPages; ++i) {
      getPage(i, year);
    }
  })
};
