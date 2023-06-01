import { useState } from 'react';
import { CreditCard } from '../components/CreditCard';
import { Form } from '../components/Form';
import PageHeader from '../components/PageHeader';

export const CardCreatePage = () => {
	const [data, setData] = useState({});

	const getData = data => {
		setData(data);
	};
	return (
		<div className='wrapper'>
			<PageHeader
				title={'Create a new card'}
				to={'/'}
				styleName={'back-btn'}
				linkTitle={'back'}
			/>
			<div className='card-wrapper'>
				<CreditCard {...data} />
			</div>
			<Form getData={getData} />
		</div>
	);
};
