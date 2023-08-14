const createCompany = async ({ jsonFile, name, ticker, type }) => {
    try {
        const response = await fetch(
            "http://localhost:3500/firebase/createCompany",
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
    fetch("http://localhost:3000/firebase/getAllCompanies");
};
export { createCompany, getAllCompanies };
