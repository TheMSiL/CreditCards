import { useState, useEffect, useCallback, createContext } from 'react';

const BASE_URL = 'https://my.api.mockaroo.com/cards/123.json?key=778301b0';

export const CreditCardContext = createContext();

export const DataContext = ({ children }) => {
	const [cardData, setCardData] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = useCallback(() => {
		setLoading(true);
		fetch(BASE_URL)
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw new Error('Something went wrong');
			})
			.then(json => setCardData(json))
			.catch(error => setError(error.message))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
    if (localStorage.getItem('cardData') === null) {
			fetchData();
		}
	}, [fetchData]);

	return (
		<CreditCardContext.Provider value={{ cardData, isLoading, error }}>
			{children}
		</CreditCardContext.Provider>
	);
};
