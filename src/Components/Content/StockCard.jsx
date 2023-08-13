export default function StockCard({ ticker, stockInfo }) {
    return <h1>{stockInfo.previousClose + " " + stockInfo.current}</h1>;
}
