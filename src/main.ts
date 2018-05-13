import * as fs from 'fs';
import { prettyJSON } from './lib/formatting';

// import { main } from './scrape/candidates';

// main();

const data = fs.readFileSync('./data/presidential-candidates-2016.json', 'UTF-8')

fs.writeFileSync('./data/pretty.json', prettyJSON(JSON.parse(data)));


