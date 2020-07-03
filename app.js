var express = require('express');
var handlebars = require('express-handlebars');

handlebars.create({ defaultLayout:'main', helpers: { queryData: "" } });

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 12345);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/calendar', (req, res) => {
    let dateData = req.query.date;
    res.render('calendar', { helpers: { queryData: dateData } });
});

app.use((req, res, next) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate');
});