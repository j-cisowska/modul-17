var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');

var app = express();
var googleProfile = {};

/***********SERIALIZACJA I DESERIALIZACJA********/

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

/**************ŻĄDANIE AUTORYZACJI OD GOOGLE************/

passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        };
        cb(null, profile);
    }
));

/***********USTAWIENIE SILNIKA I INICJALIZACJA*************/
app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());


/*******************ENDPOINTY************************/

//app routes
app.get('/', function(req, res){
    res.render('homepage', { user: req.user });
});

app.get('/logged', function(req, res){
    res.render('logged', { user: googleProfile });
});
//Passport routes
app.get('/auth/google',
passport.authenticate('google', {
scope : ['profile', 'email']
}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));

var server = app.listen(3000, function() {
    console.log('Obecnie aplikacja nasłuchuje na http://localhost:3000');
	app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
	});
});