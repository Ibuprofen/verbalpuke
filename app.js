var express = require('express');
var app = express();
var nodemailer = require('nodemailer');		// https://github.com/andris9/Nodemailer

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/hello', function(req, res){
	res.send('Hello World');
	console.log('/hello');
});

app.get('/bookmark', function (req, res) {
  console.log('/bookmark');

	var data = req.query;
	
	// "database"
	var clients = {
		'1x2x3x4x5': 'temp2@plenary.org'
	};

	// make sure client exists
	var client = {};
	if (clients.hasOwnProperty(data.clientId)) {
		client.id = data.clientId;
		client.email = clients[data.clientId];
	}

	if (client.id && client.id !== undefined) {
		if (data.subject && clientEmail) {
			var mailBody = data.url + ' ' + data.body;

			var transport = nodemailer.createTransport("SMTP", {host: 'localhost'});

			var mailOptions = {
				from: "Bookmarker <mailer@verbalpuke.com>",
				to: client.email,
				subject: data.subject,
				text: data.body
			};

			transport.sendMail(mailOptions, function (error, response) {
				if (error) {
					console.log(error);
				} else {
					console.log('message sent ' + response.message + ' ' + data.subject);
				}

				transport.close();
			});

		} else {
			console.log('missing parameters. mail not sent');
		}

		//res.send('TRUE');
	} else {
		console.log('client id not set or not found');
		//res.send('FALSE');
	}
	
  res.header('Content-Type', 'application/json');
  res.header('Charset', 'utf-8');
  res.send(req.query.callback + '({"success": true});');
});

app.listen(3000);
console.log('Listening on port 3000');