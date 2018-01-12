var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views','./views');

/***********STRONY**********/

app.get('/', function (req, res) {
    console.log('Wyświetlenie pierwszej strony');
    res.render('strona1');
});

app.get('/auth/google', function(req, res){
    console.log('Wyświetlenie drugiej strony');
	res.render('strona2');
});


/**********NASŁUCHIWANIE**********/

var server = app.listen(3000, function() {
    console.log('Obecnie aplikacja nasłuchuje na http://localhost:3000');
	app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
	});
});