interface Company {
    jsonFile: string;
    type: 'Airlines' | 'RRs' | 'Trucking' | 'Manufacturing' | 'Uber';
    name: string;
    ticker: string;
    recentWebcast: string;
    companyInformation: string;
    keyComments: string;
    linkToSlide: string;
    table: string;
}
export { Company };
