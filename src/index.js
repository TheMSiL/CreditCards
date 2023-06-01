import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import './styles/Index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<DataContext>
			<Router>
				<App />
			</Router>
		</DataContext>
	</React.StrictMode>
);
