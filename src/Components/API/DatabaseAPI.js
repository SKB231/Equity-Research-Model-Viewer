const prefix = "10.15.49.14";
//localhost

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
        console.log("CREATING NEW COMP");
        const response = await fetch(
            `http://${prefix}:3500/firebase/createCompany`,
            {
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
            }
        );
        const jsonResp = await response.json();

        if (jsonResp) {
            console.log("DATA added successfully!");
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
    fetch(`http://${prefix}:3500/firebase/getAllCompanies`);
};
export { createCompany, getAllCompanies };
