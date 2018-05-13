import * as fs from 'fs';
import { prettyJSON } from './lib/formatting';

import { getCommitteess } from './scrape/committees';
import { getCandidates } from './scrape/candidates';


// getCommitteess(2016);
getCandidates(2012);