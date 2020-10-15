import React, { useState } from "react";
import Container from "react-bootstrap/container";

import { StockPriceTable, PriceChart } from "./components";
import useStockMarketData from "./customHooks/useStockMarketData";

function App() {
	const historicalData = useStockMarketData();
	const [selectedTicker, setSelectedTicker] = useState();

	return (
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
}

export default App;
