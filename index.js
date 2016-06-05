const express = require('express');
const logger = require('morgan');
const app = express();

const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.get('/:timestamp', (req, res) => {
	var timestamp = req.params.timestamp;
	var today = (new Date()).getTime().toString();
	var regex = /(january|february|march|april|may|june|july|august|september|october|november|december) (0[1-9]|[12]\d|3[01]), (19[7-9]\d|20\d\d)/i;
	if(parseInt(timestamp) >= 0 && parseInt(timestamp) <= parseInt(today.slice(0, today.length - 3))) {
		var date = new Date(parseInt(timestamp + '000'));
		res.json(generateTimestamp(date));
	} else if(timestamp.match(regex)) {
		res.send(timestamp);
	} else {
		res.status(400).json({unix: null, natural: null});
	}
});

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

function generateTimestamp(date) {
	var unix = date.getTime().toString();
	return {
		unix: unix.slice(0, unix.length - 3),
		natural: `${getMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
	};
}

function getMonth(monthNum) {
	switch(monthNum) {
		case 0:
			return 'January';
			break;
		case 1:
			return 'February';
			break;
		case 2:
			return 'March' 
			break;
		case 3:
			return 'April';
			break;
		case 4:
			return 'May';
			break;
		case 5:
			return 'June';
			break;
		case 6:
			return 'July';
			break;
		case 7:
			return 'August';
			break;
		case 8:
			return 'September';
			break;
		case 9:
			return 'October';
			break;
		case 10:
			return 'November';
			break;
		case 11:
			return 'December'; 
			break;
	}
}

function getMonthNum(month) {
	switch(month) {
		case 'January':
			return 1;
			break;
		case 'February':
			return 2;
			break;
		case 'March':
			return 3; 
			break;
		case 'April':
			return 4;
			break;
		case 'May':
			return 5;
			break;
		case 'June':
			return 6;
			break;
		case 'July':
			return 7;
			break;
		case 'August':
			return 8;
			break;
		case 'September':
			return 9;
			break;
		case 'October':
			return 10;
			break;
		case 'November':
			return 11;
			break;
		case 'December':
			return 12; 
			break;
	}
}
