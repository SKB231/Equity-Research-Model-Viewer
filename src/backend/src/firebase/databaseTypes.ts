interface Company {
  jsonFile: string;
  type: 'Airlines' | 'RRs' | 'Trucking' | 'Manufacturing' | 'Uber';
  name: string;
  ticker: string;
}

export { Company };
