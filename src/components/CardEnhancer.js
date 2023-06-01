import { useCallback, useState } from 'react';
import hideCardNum from '../assets/statistic/HideCardNumber.png';
import showCardNum from '../assets/statistic/ShowCardNumber.svg';
import rotateImg from '../assets/statistic/cardFlip.svg';
import statisticImg from '../assets/statistic/statistic.svg';
import { formatDate } from '../helpers/cardUtils';

const CardEnhancer = ({
	cardStatistic,
	isShowCardNumber,
	showCardNumber,
	changeSide,
}) => {
	const [isShowStatistic, setShowStatistic] = useState(false);


	const handelChangeSide = useCallback(() => {
		changeSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
	}, [changeSide]);

	return (
		<div className={!isShowStatistic ? 'enhancer' : 'enhancer-statistic'}>
			{!isShowStatistic && (
				<>
					<button
						className='enhancer-btn'
						onClick={() => isShowCardNumber(prev => !prev)}
					>
						<img
							src={showCardNumber ? showCardNum : hideCardNum}
							alt='cardNum-btn'
						/>
					</button>
					<div className='statistic-wrapper'>
						<button
							className='enhancer-btn'
							onClick={() => setShowStatistic(prev => !prev)}
						>
							<img src={statisticImg} alt='card-statistic' />
						</button>
						{isShowStatistic &&
							cardStatistic?.map(period => {
								return (
									<div className='statistic' key={period.id}>
										<p>{formatDate(period.date)}</p>
										<p>{period.place}</p>
										<p>
											{period.expense}
											{period.currency}
										</p>
									</div>
								);
							})}
					</div>
					<button className='enhancer-btn' onClick={handelChangeSide}>
						<img src={rotateImg} alt='rotate' />
					</button>
				</>
			)}
			{isShowStatistic && (
				<>
					<p className='statistic-title'>Card Stat</p>
					{cardStatistic?.length > 0 ? (
						cardStatistic.map(period => {
							return (
								<div className='statistic' key={period.id}>
									<p className='statistic-date'>{formatDate(period.date)}</p>
									<p className='statistic-place'>{period.place}</p>
									<p className='statistic-currency'>
										{period.expense}
										{period.currency}
									</p>
								</div>
							);
						})
					) : (
						<p className='tip'>Time to spice it up!</p>
					)}
				</>
			)}
		</div>
	);
};

export default CardEnhancer;
