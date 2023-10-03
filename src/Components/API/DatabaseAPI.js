let prefix = "https://equity-research-backend-production.up.railway.app";
//localhost
// prefix = "http://localhost:3500";

const createCompany = async ({
    jsonFile,
    name,
    ticker,
    type,
    recentWebcast,
    companyInformation,
    keyComments,
    linkToSlide,
    table,
}) => {
    try {
        const response = await fetch(`${prefix}/firebase/createCompany`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonFile: jsonFile,
                name: name,
                ticker: ticker,
                type: type,
                recentWebcast: recentWebcast,
                companyInformation: companyInformation,
                keyComments: keyComments,
                linkToSlide: linkToSlide,
                table: table,
            }),
        });
        const jsonResp = await response.json();

        if (jsonResp) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return 1;
    }
};

const getAllCompanies = () => {
    fetch(`${prefix}/firebase/getAllCompanies`);
};

const deleteCompanyFromId = async (id) => {
    try {
        //deleteCompanyById
        console.log(id)
        const response = await fetch(`${prefix}/firebase/deleteCompanyById`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyId: id,
            }),
        });

        return 0;
    } catch (err) {
        console.log(err);
        return 1;
    }
};

export { createCompany, getAllCompanies, deleteCompanyFromId };
