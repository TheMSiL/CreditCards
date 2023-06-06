import { useCallback, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import chip from '../assets/another/chip.svg';
import nfc from '../assets/another/nfc.svg';
import amexFront from '../assets/front_side/amex_front.svg';
import discoverFront from '../assets/front_side/discover_front.svg';
import mastercardFront from '../assets/front_side/mastercard_front.svg';
import visaFront from '../assets/front_side/visa_front.svg';
import amex from '../assets/logos/amex_logo.svg';
import discover from '../assets/logos/discover_logo.svg';
import mastercard from '../assets/logos/mastercard_logo.svg';
import visa from '../assets/logos/visa_logo.svg';
import { formatDateString, maskCardNumber } from '../helpers/cardUtils';
import CardEnhancer from './CardEnhancer';

const pulseCardTypeAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const CardContainer = styled.div`
	perspective: 1000px;
	position: relative;
	&:hover {
		.card-type {
			animation: ${pulseCardTypeAnimation} 2s ease-in-out infinite;
		}
	}
	transform-style: preserve-3d;
	transform: ${props =>
		props.rotatedCard === 'back' ? 'rotateY(180deg)' : 'rotateY(-180deg)'};
	transition: transform 2s;
	z-index: 1;
`;

const FlipContainer = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	transform-style: preserve-3d;
	transform: ${props =>
		props.rotatedCard === 'back' ? 'rotateY(180deg)' : 'rotateY(-180deg)'};
	transition: transform 2s;
	z-index: -1;
`;

const FrontSide = styled.div`
	margin: 0 auto 35px;
	box-sizing: border-box;
	padding: 25px;
	border-radius: 12px;
	background: url(${props => props.cardType});
	background-repeat: no-repeat;
	backface-visibility: hidden;
	background-size: cover;
	transform: ${props =>
		props.rotatedCard === 'back' ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
	transition: transform 2s;

	@media (max-width: 450px) {
		padding: 18px;
	}
`;

const BackSide = styled.div`
	position: absolute;
	width: 100%;
	top: 0;
	margin: 0 auto 35px;
	box-sizing: border-box;
	padding: 21px 0 25px;
	height: 287px;
	border-radius: 12px;
	background: url(${props => props.cardType});
	background-repeat: no-repeat;
	backface-visibility: hidden;
	background-size: cover;
	transform: ${props =>
		props.rotatedCard === 'back' ? 'rotateY(0deg)' : 'rotateY(180deg)'};
	transition: transform 2s;

	@media (max-width: 450px) {
		height: 194px;
	}
`;

const CardHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 58px;

	@media (max-width: 450px) {
		margin-bottom: 35px;
	}
`;

const NFC = styled.img`
	@media (max-width: 450px) {
		width: 17px;
	}
`;

const CardMark = styled.img`
	transition: transform 1s;
	animation: ${pulseCardTypeAnimation} 2s ease-in-out infinite;
	animation-play-state: paused;

	${FlipContainer}:hover & {
		animation-play-state: running;
	}
`;

const CardMiddle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 55px;

	@media (max-width: 450px) {
		margin-bottom: 15px;
	}
`;

const CardNumber = styled.p`
	color: white;
	font-size: 19px;
	line-height: 22px;
	letter-spacing: 0.105em;
	margin: 0;

	@media (max-width: 450px) {
		font-size: 16px;
		line-height: 20px;
	}
`;

const Chip = styled.img``;

const CardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const CardOwnerText = styled.p`
	color: white;
	font-size: 18px;
	line-height: 20px;
	animation: typingAnimation 2s forwards;
	transition: 1s;

	@keyframes typingAnimation {
		0% {
			transform: translateX(60%);
			opacity: 0.25;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			transform: translateX(0%);
			opacity: 1;
		}
	}
`;

const CardCVV = styled.p`
	color: white;
	font-size: 18px;
	line-height: 20px;
	text-align: end;
	margin: 25px 25px 0 0;
`;

const ExpireDate = styled.p`
	color: white;
	font-size: 18px;
	line-height: 20px;
`;

const BlackLine = styled.div`
	background-color: black;
	height: 60px;
	width: 100%;
`;

export const CreditCard = ({
	cardNumber,
	cardOwner,
	cardCVV,
	cardType,
	expiryDate,
	cardStatistic,
}) => {
	const [showCardEnhancer, setIsShownCardEnhancer] = useState(false);
	const [showCardNumber, setShowCardNumber] = useState(false);
	const [rotatedCard, setRotatedCard] = useState('front');

	const memoizedShowCardEnhancer = useMemo(
		() => showCardEnhancer,
		[showCardEnhancer]
	);
	const memoizedShowCardNumber = useMemo(
		() => showCardNumber,
		[showCardNumber]
	);
	const memoizedRotatedCard = useMemo(() => rotatedCard, [rotatedCard]);

	const handleCardClick = useCallback(() => {
		setIsShownCardEnhancer(prev => !prev);
	}, []);

	const setCardBg = useMemo(() => {
		return cardType => {
			const cardBg = {
				mastercard: mastercardFront,
				visa: visaFront,
				'american express': amexFront,
				discover: discoverFront,
			};
			return cardBg[cardType];
		};
	}, []);

	const cardLogo = useMemo(() => {
		return cardType => {
			const logos = {
				mastercard,
				visa,
				'american express': amex,
				discover,
			};
			return logos[cardType];
		};
	}, []);
	return (
		<>
			<CardContainer>
				<FlipContainer rotated={memoizedRotatedCard}>
					<FrontSide
						rotatedCard={memoizedRotatedCard}
						cardType={setCardBg(cardType)}
						onClick={handleCardClick}
					>
						<CardHeader>
							<CardMark src={cardLogo(cardType)} alt='card-logo' />
							<NFC src={nfc} alt='nfc' />
						</CardHeader>
						<CardMiddle>
							<CardNumber>
								{!memoizedShowCardNumber
									? cardNumber
										? maskCardNumber(cardNumber)
										: '●●●● ●●●● ●●●● ●●●●'
									: cardNumber?.replace(/(.{4})/g, '$1 ')}
							</CardNumber>
							<Chip src={chip} alt='chip' />
						</CardMiddle>
						<CardFooter>
							<CardOwnerText>{cardOwner}</CardOwnerText>
							<ExpireDate>
								{expiryDate
									? formatDateString(expiryDate)
									: 'After card creation'}
							</ExpireDate>
						</CardFooter>
					</FrontSide>
					<BackSide
						rotatedCard={memoizedRotatedCard}
						cardType={setCardBg(cardType)}
						onClick={handleCardClick}
					>
						<>
							<BlackLine />
							<CardCVV>{cardCVV}</CardCVV>
						</>
					</BackSide>
				</FlipContainer>
			</CardContainer>
			{memoizedShowCardEnhancer && (
				<CardEnhancer
					showCardNumber={memoizedShowCardNumber}
					isShowCardNumber={setShowCardNumber}
					cardStatistic={cardStatistic}
					changeSide={setRotatedCard}
				/>
			)}
		</>
	);
};
