import * as fs from 'fs'

import { API_KEY, FECUrl as url, MAX_PAGE_SIZE } from './fec';
import { HTTPWrapper } from '../lib/http';
import { prettyJSON } from '../lib/formatting';

const http = HTTPWrapper.getInstance();
const results = {};

let maxPages;

function getPage(pageNumber: number, year: number, getNextPage: boolean = false) {
  const params = {
    api_key: API_KEY,
    cycle: year,
    office: 'P',
    per_page: MAX_PAGE_SIZE,
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

    if(pageNumber < maxPages) {
      return getPage(pageNumber + 1, year, true)
    } 
    
    fs.writeFileSync(`./data/presidential-candidates-${ year }.json`, prettyJSON(results));
    return Promise.resolve(results);
  })
};

export const getCandidates = cycle => {
  return getPage(1, cycle, true);
}
