export const API_KEY = process.env.FEC_API_KEY;

const BASE_URL = 'https://api.open.fec.gov/v1';
export const FECUrl = aUrl => `${ BASE_URL }${ aUrl }`;

export const MAX_PAGE_SIZE = 100;