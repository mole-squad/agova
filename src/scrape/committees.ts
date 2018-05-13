import * as fs from 'fs'

import { API_KEY, FECUrl as url, MAX_PAGE_SIZE } from './fec';
import { HTTPWrapper } from '../lib/http';
import { prettyJSON } from '../lib/formatting';

const http = HTTPWrapper.getInstance();

const results = {};
let maxPages;

export const getPage = (page: number, cycle: number, getNextPage: boolean = false, sort = 'name' ) => {
  const params = {
    api_key: API_KEY,
    cycle,
    per_page: MAX_PAGE_SIZE,
    committee_type: ['E', 'I', 'N', 'P', 'Q', 'U', 'X', 'Y', 'Z'],
    page,
    sort
  };

  return http.get(url('/committees/'), params).then(data => {
    data.results.forEach(anItem => {
      results[anItem.committee_id] = anItem;
    });

    if(!maxPages) {
      maxPages = data.pagination.pages;
    }

    if (getNextPage && page < maxPages) {
      return getPage(page + 1, cycle, true, sort);
    }

    
    fs.writeFileSync(`./data/non-super-pac-committees-${ cycle }.json`, prettyJSON(results));
    return Promise.resolve(results);
  });
};

export const getCommitteess = cycle  => {
  return getPage(1, cycle, true);
};
