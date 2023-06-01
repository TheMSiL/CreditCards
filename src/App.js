import { Routes, Route, Navigate } from 'react-router-dom';
import { CardsPage } from './pages/CardsPage';
import { CardCreatePage } from './pages/CardCreatePage';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<CardsPage />} />
			<Route path='/add-card' element={<CardCreatePage />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default App;
