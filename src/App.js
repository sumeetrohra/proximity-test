import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";

import { StockPriceTable, PriceChart } from "./components";
import useStockMarketData from "./customHooks/useStockMarketData";

function App() {
	const historicalData = useStockMarketData();
	const [selectedTicker, setSelectedTicker] = useState();

	const renderError = () => (
		<Container>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "lightGrey",
				}}>
				<Spinner animation="border" />
				<h1 style={{ marginLeft: "10px" }}>Loading...</h1>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					padding: "10px",
				}}>
				<p>This site can't work until you allow insecure connection</p>
				<p>This is just a dummy app, no harm will be caused by this</p>
				<p>
					To allow insecre app, follow these steps for google chrome: Open
					chrome settings -{">"} Privacy & Security -{">"} Click on site
					settings -{">"} click on additional content settings -{">"} Click on
					insecure content and add https://sumeetrohra.github.io/proximity-test
					under allow section -{">"} Reload the page
				</p>
			</div>
		</Container>
	);

	const renderChart = () => (
		<Container
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 4fr",
				gridGap: "20px",
				marginTop: "20px",
			}}>
			<StockPriceTable
				priceData={historicalData}
				setSelectedTicker={setSelectedTicker}
			/>
			<PriceChart
				data={{
					ticker: selectedTicker,
					priceData: historicalData[selectedTicker],
				}}
			/>
		</Container>
	);

	return historicalData.error ? renderError() : renderChart();
}

export default App;
