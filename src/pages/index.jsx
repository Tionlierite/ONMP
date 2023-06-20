import { Route, Switch } from 'react-router-dom'

import Algorithms from './feature-pages/algorithms'
import Dictionary from './feature-pages/dictionary'
import Calculator from './feature-pages/calculator'
import WorkWithTable from './feature-pages/tables/WorkWithTable'
import Tables from './feature-pages/tables'
import CardList from './card-list'
import { NavBar } from '../widgets/nav-bar'
import CardCreate from './card-create'

const Routing = () => {
	return (
		<>
			<NavBar />
			<Switch>
				<Route path='/card-list' component={CardList} />
				<Route path='/card-create/:cardId?/:folder?' component={CardCreate} />
				<Route path='/algorithms' component={Algorithms} />
				<Route path='/dictionary' component={Dictionary} />
				<Route path='/calculator' component={Calculator} />
				<Route path='/tables/WorkWithTable' component={WorkWithTable} />
				<Route path='/tables' component={Tables} />
			</Switch>
		</>
	)
}

export default Routing
