let prefix = "equity-research-backend-production.up.railway.app";
//localhost
// prefix = 'localhost:3500'

/**
 * Returns the stock price history based on the given parameter
 * @param requestBody request object containing start date, end date, company ticker, and frequency (1d, 1wk, 1mo)
 */
const getCompanyStock = async (requestBody) => {
    try {
        const response = await fetch(
            `https://${prefix}/yahooFinance/getCompanyStock`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );

        const responseData = await response.json();

        if (responseData) {
            return responseData;
        } else {
            return null;
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return 1;
    }
};

/**
 * Returns the current stock price information for the given company
 * @param requestBody of format {symbol: Company_Ticker}
 */
const getCompanyCurrentStock = async ({ symbol }) => {
    try {
        const response = await fetch(
            `https://${prefix}/yahooFinance/getCurrentStockPrice/${symbol}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const responseData = await response.json();

        if (responseData) {

            return responseData;
        } else {
            return null;
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return 1;
    }
};

/**
 * Return the single stock information to show along with the graph
 * @param requestObject which is just thes ticker
 */
const getCompanyStockInfo = async ({ symbol }) => {
    try {
        const response = await fetch(
            `https://${prefix}/yahooFinance/getCompanyStockInfo`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symbol: symbol }),
            }
        );

        const responseData = await response.json();
        if (responseData) {

            return responseData;
        } else {
            return null;
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        return 1;
    }
};

export { getCompanyCurrentStock, getCompanyStock, getCompanyStockInfo };
