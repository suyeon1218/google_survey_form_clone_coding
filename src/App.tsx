import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Response from './pages/Response';
import Result from './pages/Result';

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
				<Route
					path={'/result'}
					element={<Result />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
