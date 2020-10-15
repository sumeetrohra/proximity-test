import { useState, useEffect } from "react";

export default () => {
	const [currentStockPriceData, setCurrentStockPriceData] = useState([]);
	const [historicalData, setHistoricalData] = useState({});

	const ENDPOINT = "wsit://stocks.mnet.website";

	useEffect(() => {
		const connection = new WebSocket(ENDPOINT);
		connection.onmessage = (event) =>
			setCurrentStockPriceData(JSON.parse(event.data));
	}, []);

	useEffect(() => {
		const mergedData = Array.isArray(currentStockPriceData)
			? currentStockPriceData.reduce((acc, curr) => {
					const ticker = curr[0];
					const price = curr[1];

					const latestData = {
						timestamp: new Date(),
						price,
					};

					acc[ticker] = Array.isArray(acc[ticker])
						? [...acc[ticker], latestData]
						: [latestData];
					return acc;
			  }, historicalData)
			: [];

		setHistoricalData(mergedData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentStockPriceData]);

	return historicalData;
};
