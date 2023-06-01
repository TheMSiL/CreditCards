export const maskCardNumber = cardNumber => {
	const visibleDigits = 4;
	const maskedDigits = cardNumber
		.replace(/\s/g, '')
		.slice(-visibleDigits)
		.padStart(cardNumber.length, '●')
		.replace(/(.{4})/g, '$1 ');
	return maskedDigits;
};

export const formatDateString = dateString => {
	const [month, , year] = dateString.split('/');
	const formattedDate = `${month.padStart(2, '0')}/${year.slice(-2)}`;
	return formattedDate;
};

export const formatDate = dateString => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${day}.${month}`;
};

