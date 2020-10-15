import React from "react";
import propTypes from "prop-types";
import Table from "react-bootstrap/table";

const StockPriceTable = ({ priceData, setSelectedTicker }) => {
	const tickerSymbols = Object.keys(priceData);

	const getColor = (currPrice, prevPrice) => {
		if (!prevPrice) {
			return;
		} else if (currPrice < prevPrice) {
			return "red";
		}
		return "green";
	};

	const renderTicker = (item) => {
		const arrLength = priceData[item].length;
		const currPrice = priceData[item][arrLength - 1].price;
		const prevPrice =
			priceData[item][arrLength - 2] && priceData[item][arrLength - 2].price;
		const color = getColor(currPrice, prevPrice);
		return (
			<tr
				style={{ cursor: "pointer" }}
				key={item}
				onClick={() => setSelectedTicker(item)}>
				<td>{item}</td>
				<td style={{ backgroundColor: color && color }}>{currPrice}</td>
			</tr>
		);
	};

	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>Ticker</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{Array.isArray(tickerSymbols) && tickerSymbols.map(renderTicker)}
			</tbody>
		</Table>
	);
};

StockPriceTable.propTypes = {
	priceData: propTypes.objectOf(
		propTypes.arrayOf(
			propTypes.shape({
				timestamp: propTypes.date,
				price: propTypes.number,
			})
		)
	).isRequired,
	setSelectedTicker: propTypes.func.isRequired,
};

export default StockPriceTable;
