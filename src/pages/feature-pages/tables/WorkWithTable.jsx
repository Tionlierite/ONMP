import React from 'react';
import SelectableDataGrid from './DataGrid'

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
					<SelectableDataGrid name_of_table={this.props.location.state} />
				</div>
		);
	}
}
export default App;