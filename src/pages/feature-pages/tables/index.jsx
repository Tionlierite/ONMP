import React from 'react';
import CustomizedInputBase from "./Search.jsx";

let coc = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
let string_url = "188.225.78.148/api/v1/differentials_tables/get_diff_tables/?name="
let name = "Шкала оценки вероятности ТЭЛА (Revised Geneva Score)"

class App extends React.Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		error: null,
	// 		isLoaded: false,
	// 		items: []
	// 	};
	// }

	// componentDidMount() {
	// 	fetch("http://188.225.78.148/api/v1/differentials_tables/get_diff_tables/?name=" + name)
	// 	.then (res => res.json())
	// 	.then (
	// 		(result) => {
	// 			this.setState({
	// 				isLoaded: true,
	// 				items: result[name].data[name]
	// 			});
	// 		},
	// 		(error) => {
	// 			this.setState({
	// 				isLoaded: true,
	// 				error
	// 			});
	// 		}
	// 	)
	// }

	// render() {
	// 	const {error, isLoaded, items} = this.state;
	// 	if (error) {
	// 		return <p> Error {error.message} </p>
	// 	}
	// 	else if (!isLoaded) {
	// 		return <p> Loaded... </p>
	// 	}
	// 	else {
	// 		return (
	// 			<ul>
	// 				{items.map(item => (
	// 					<li key = {item.name} >
	// 						{item.Признак}
	// 					</li>
	// 				))}
	// 			</ul>
	// 		)
	// 	}
	render() { return (
			<div>
        		<CustomizedInputBase />
			</div>
		);
	}
}
export default App;