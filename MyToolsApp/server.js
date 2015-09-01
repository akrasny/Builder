var express = require('express'),
    app = express();

var contacts = [{
    firstName: 'Alexander',
    lastName: 'Krasny'
}];

app.get('/contacts', function (req, res) {
    res.status(200).json(contacts);
});

app.listen(8082);