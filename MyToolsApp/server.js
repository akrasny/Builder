var express = require('express'),
    app = express();

var contacts = [{
    firstName: 'Alexander',
    lastName: 'Krasny'
}];

app.get('/api/Account/UsernameExists', function (req, res) {
    res.status(200).json(contacts);
});

app.get('/contacts', function (req, res) {
    res.status(200).json(contacts);
});

app.listen(53333);