import React, { useState, useEffect, useContext } from 'react';
import { CreditCard } from '../components/CreditCard';
import { CreditCardContext } from '../context/DataContext';
import PageHeader from '../components/PageHeader';

export const CardsPage = () => {
	const { cardData, isLoading, error } = useContext(CreditCardContext);
	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const localStorageData = localStorage.getItem('cardData');
		const parsedData = localStorageData
			? Object.values(JSON.parse(localStorageData))
			: [];
		setLocalData(parsedData);
	}, []);

	const renderCards = () => {
		if (localData.length > 0) {
			return localData.map(data => (
				<div className='card-wrapper' key={data.cardId}>
					<CreditCard {...data} />
				</div>
			));
		}

		if (!isLoading && !error && cardData.data) {
			return cardData.data.map(creditCard => (
				<div className='card-wrapper' key={creditCard.card.numbers}>
					<CreditCard
						cardNumber={creditCard.card.numbers}
						cardOwner={cardData.user_name}
						cardType={creditCard.card.type}
						cardCVV={creditCard.card.cvv}
						expiryDate={creditCard.card.expiry_date}
						cardStatistic={creditCard.statistic}
					/>
				</div>
			));
		}

		if (error) {
			return <div className='card-wrapper'>{error.message}</div>;
		}

		return null;
	};

	return (
		<div className='wrapper'>
			<PageHeader
				title={'Your cards'}
				to={'/add-card'}
				styleName={'add-card-btn'}
				linkTitle={'Create'}
			/>
			<div className='cards-wrapper'>{renderCards()}</div>
		</div>
	);
};
