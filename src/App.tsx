import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Response from './pages/Response';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path={'/'}
					element={<Form />}
				/>
				<Route
					path={'/response'}
					element={<Response />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
