import React from "react";
import { LineChart } from "react-chartkick";
import "chart.js";
import propTypes from "prop-types";

const PriceChart = ({ data }) => {
	const getRenderData = (priceData) =>
		priceData.reduce((acc, curr) => {
			acc[curr.timestamp] = curr.price;
			return acc;
		}, {});

	return data.ticker ? (
		<div>
			<h1>{data.ticker}</h1>
			<LineChart
				data={getRenderData(data.priceData)}
				height="500px"
				label={data.ticker}
			/>
		</div>
	) : (
		<p>Please select a ticker</p>
	);
};

PriceChart.propTypes = {
	data: propTypes.shape({
		priceData: propTypes.arrayOf(
			propTypes.shape({
				timestamp: propTypes.date,
				price: propTypes.number,
			})
		),
		ticker: propTypes.string,
	}),
};

PriceChart.defaultProps = {
	data: null,
};

export default PriceChart;
