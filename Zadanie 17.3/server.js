var express = require('express');
var app = express();

app.use('/shop', function(req, res, next) {
    console.log('Pośrednik przy żądaniu /shop');
	next();
});


app.get('/shop', function (req, res) {
    console.log('Wyświetlenie to jest sklep');
    res.send('To jest sklep~');
});



var server = app.listen(3000, function() {
    console.log('Obecnie aplikacja nasłuchuje na http://localhost:3000');
	app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
	});
});

/*app.post('/', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony głównej');
	res.send('Hello GET!');
});

app.delete('/del_user', function (req, res) {
    console.log('Otrzymałem żądanie DELETE do strony /del_user');
    res.send('Hello DELETE!');
});

app.get('/list_user', function (req, res) {
    console.log('Otrzymałem żądanie GET do strony /list_user');
    res.send('Strona z listą użytkowników!');
});

app.get('/ab*cd', function(req, res) {
    console.log('Otrzymałem żądanie GET do strony /ab*cd');
    res.send('Wzór pasuje');
});




var server = app.listen(3000, function() {
    console.log('Obecnie aplikacja nasłuchuje na http://localhost:3000');
});*/