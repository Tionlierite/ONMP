import NavBar from './Components/navBar'
import { Route, Switch } from 'react-router-dom'

import Home from './Components/home'
import Algorithms from '../pages/feature-pages/algorithms'
import Calculator from '../pages/feature-pages/calculator'
import Dictionary from '../pages/feature-pages/dictionary'
import Tables from '../pages/feature-pages/tables'
import WorkWithTable from '../pages/feature-pages/tables/WorkWithTable'

function App() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/algorithms' component={Algorithms} />
				<Route path='/dictionary' component={Dictionary} />
				<Route path='/calculator' component={Calculator} />
				<Route path='/tables' component={Tables} />
				<Route path='/WorkWithTable' component={WorkWithTable} />
			</Switch>
		</div>
	)
}

export default App
