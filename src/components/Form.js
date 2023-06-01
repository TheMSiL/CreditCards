import { useCallback, useEffect, useMemo, useState } from 'react';

const LOCAL_KEY = 'cardData';

export const Form = ({ getData }) => {
	const [cardNumber, setCardNumber] = useState('');
	const [cardOwner, setCardOwner] = useState('');
	const [cardCVV, setCardCVV] = useState('');
	const [cardId, setCardId] = useState(Math.round(Math.random() * 1000));
	const [expiryDate, setExpiryDate] = useState('01/01/24');
	const [cardStatistic, setCardStatistic] = useState([]);
	const [cardType, setCardType] = useState('visa');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
	const [errors, setErrors] = useState({
		cardNumber: '',
		cardOwner: '',
		cardCVV: '',
		duplicate: '',
  });
  

	const memoizedGetData = useCallback(() => {
		getData({
			cardNumber,
			cardOwner,
			cardCVV,
			cardType,
			cardId,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cardNumber, cardOwner, cardCVV, cardType, cardId]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	const cardStatisticArr = useMemo(
		() => [
			{
				currency: 'грн.',
				date: '02/27/2022',
				expense: 500,
				id: 1,
				place: 'Comfy',
			},
			{
				currency: 'грн.',
				date: '6/13/2022',
				expense: 250,
				id: 2,
				place: 'Book Store',
			},
			{
				currency: 'грн.',
				date: '7/15/2022',
				expense: 600,
				id: 3,
				place: 'ATB',
			},
			{
				currency: 'грн.',
				date: '9/12/2022',
				expense: 900,
				id: 4,
				place: 'Fora',
			},
			{
				currency: 'грн.',
				date: '12/21/2022',
				expense: 12000,
				id: 5,
				place: 'Apple',
			},
			{
				currency: 'грн.',
				date: '12/31/2022',
				expense: 2500,
				id: 6,
				place: 'Rozetka',
			},
			{
				currency: 'грн.',
				date: '10/05/2022',
				expense: 700,
				id: 7,
				place: 'Supermarket',
			},
			{
				currency: 'грн.',
				date: '11/18/2022',
				expense: 400,
				id: 8,
				place: 'Restaurant',
			},
			{
				currency: 'грн.',
				date: '01/07/2023',
				expense: 1200,
				id: 9,
				place: 'Electronics Store',
			},
			{
				currency: 'грн.',
				date: '03/22/2023',
				expense: 800,
				id: 10,
				place: 'Clothing Store',
			},
			{
				currency: '$',
				date: '04/30/2023',
				expense: 150,
				id: 11,
				place: 'Coffee Shop',
			},
			{
				currency: 'грн.',
				date: '05/15/2023',
				expense: 950,
				id: 12,
				place: 'Furniture Store',
			},
			{
				currency: 'грн.',
				date: '06/28/2023',
				expense: 300,
				id: 13,
				place: 'Gas Station',
			},
			{
				currency: '$',
				date: '08/10/2023',
				expense: 200,
				id: 14,
				place: 'Movie Theater',
			},
			{
				currency: 'грн.',
				date: '09/27/2023',
				expense: 1800,
				id: 15,
				place: 'Hardware Store',
			},
		],
		[]
	);

	const selectedItems = cardStatisticArr
		.sort(() => Math.random() - 0.5)
		.slice(0, 5);

	const changeCardOwner = useCallback(e => {
		const capitalizedOwner = e
			.split(' ')
			.map(word => {
				const firstLetter = word.charAt(0).toUpperCase();
				const remainingLetters = word.slice(1).toLowerCase();
				return firstLetter + remainingLetters;
			})
			.join(' ');

		setErrors(errors => ({ ...errors, cardOwner: '' }));
		setCardOwner(capitalizedOwner);
	}, []);

	const changeCardCVV = useCallback(e => {
		setErrors(errors => ({ ...errors, cardCVV: '' }));
		setCardCVV(e);
	}, []);

	const changeCardNumber = useCallback(e => {
		setErrors(errors => ({ ...errors, cardNumber: '' }));
		setCardNumber(e);
	}, []);

	const handleCardTypeChange = event => {
		setCardType(event.target.value);
	};

	const validateName = useMemo(() => {
		const regex = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}$/;
		return cardOwner => regex.test(cardOwner);
	}, []);

	const formData = [
		{
			id: 1,
			name: 'cardNumber',
			text: 'Card Number',
			placeholder: '0000 0000 0000 0000',
			type: 'number',
			length: '16',
			value: cardNumber,
			onChange: changeCardNumber,
		},
		{
			id: 2,
			name: 'cardCVV',
			text: 'CVV',
			placeholder: '777',
			length: '3',
			type: 'number',
			value: cardCVV,
			onChange: changeCardCVV,
		},
		{
			id: 3,
			name: 'cardOwner',
			text: 'Your full name',
			placeholder: 'Tony Stark',
			length: '14',
			type: 'text',
			value: cardOwner,
			onChange: changeCardOwner,
		},
	];

	const month = Math.floor(Math.random() * 12) + 1;
	const year = Math.floor(Math.random() * (31 - 24) + 24);

	const newExpiryDate = `${month}/11/${year}`;

	const handleSubmit = event => {
		event.preventDefault();

		const validateForm = () => {
			const newErrors = {};

			if (cardNumber.length !== 16) {
				newErrors.cardNumber = 'Card number must have only 16 numbers';
			}

			if (cardCVV.length !== 3) {
				newErrors.cardCVV = 'CVV must have only 3 numbers';
			}

			if (!validateName(cardOwner)) {
				newErrors.cardOwner =
					'You need to enter your first and last name in Latin characters with a space in between';
			}

			return newErrors;
		};

		const newErrors = validateForm();

		if (Object.keys(newErrors).length === 0) {
			setCardId(Math.round(Math.random() * 1000));
			setExpiryDate(newExpiryDate);
			setCardStatistic([...selectedItems]);
			setCardNumber('');
			setCardOwner('');
			setCardCVV('');

			const formData = {
				cardNumber,
				cardOwner,
				cardCVV,
				cardType,
				cardId,
				expiryDate,
				cardStatistic,
			};

			const existingData = localStorage.getItem(LOCAL_KEY);
			const parsedExistingData = existingData ? JSON.parse(existingData) : {};

			const isIdentical = Object.values(parsedExistingData).some(
				existingFormData => {
					return (
						existingFormData.cardNumber === formData.cardNumber &&
						existingFormData.cardType === formData.cardType
					);
				}
			);

			if (!isIdentical) {
				const newKey = Math.round(Math.random() * 1000).toString();

				localStorage.setItem(
					LOCAL_KEY,
					JSON.stringify({
						...parsedExistingData,
						[newKey]: formData,
					})
				);
				setIsSubmitted(true);
				setTimeout(() => {
					setIsSubmitted(false);
				}, 2000);
			} else {
				newErrors.duplicate = 'Card already exists';
			}
		}

		setErrors(newErrors);
  };
  
    const handleClick = () => {
			setIsClicked(prev => !prev);
		};

	return (
		<>
			{isSubmitted && (
				<span className='form-submitted'>Card successfully created</span>
			)}
			<form className='form' onSubmit={handleSubmit}>
				{formData.map(input => {
					return (
						<div key={input.id}>
							<p className='form-text'>{input.text}</p>
							<input
								className='form-input'
								name={input.name}
								placeholder={input.placeholder}
								maxLength={input.length}
								value={input.value}
								onChange={e => input.onChange(e.target.value)}
								onFocus={() => (errors.duplicate = '')}
							/>
							<span className='form-error'>{errors[input.name]}</span>
						</div>
					);
				})}
				<div>
					<p className='form-text'>VISA or MASTERCARD</p>
					<select
						className={`form-input form-select ${isClicked ? 'clicked' : ''}`}
						onChange={handleCardTypeChange}
						value={cardType}
						onClick={handleClick}
					>
						<option>visa</option>
						<option>mastercard</option>
						<option>american express</option>
						<option>discover</option>
					</select>
					{errors.duplicate ? (
						<span className='form-error'>{errors.duplicate}</span>
					) : (
						<></>
					)}
				</div>
				<button className='form-button' type='submit'>
					Add card
				</button>
			</form>
		</>
	);
};
