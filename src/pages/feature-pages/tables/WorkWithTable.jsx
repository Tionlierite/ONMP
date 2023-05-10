import React from 'react';
import SelectableDataGrid from "./DataGrid";

class App extends React.Component {

	constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
        }

    }

	render() {
		return (
				<div>
					<h2>Нажатое название таблицы - {this.props.location.state}, по нему делаем API-запрос на получение таблицы</h2>
					<SelectableDataGrid />
				</div>
		);
	}
}
export default App;