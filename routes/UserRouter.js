var express = require('express');
var router = express.Router();
var User = require('../models/UserModel');

router.get('/:id?', function(req, res, next) {

	if (req.params.id) {
		User.getUserById(req.params.id, function(err, rows) {
			if (err) {
				res.sendStatus(500);
			} else {
				if(rows.length === 0) {
					res.sendStatus(404);
				}
				else {
					res.json(rows);
				}
			}
		});
	} else {
		User.getAllUser(function(err, rows) {
			if (err) {
				res.sendStatus(500);
			} else {
				res.json(rows.map(elem => {
					return {
						User_Id: elem.User_Id,
						Firstname: elem.Firstname,
						Name: elem.Name,
						Email: elem.Email
					};
				}));
			}

		});
	}
});

router.post('/', function(req, res, next) {

	User.addUser(req.body, function(err, count) {

		//console.log(req.body);

		if (err) {
			res.sendStatus(500);
		} else {
			res.json({
				User_Id: count.insertId,
				Firstname: req.body.Firstname,
    			Name: req.body.Name,
				Email: req.body.Email,
			});
		}
	});
});


router.delete('/:id', function(req, res, next) {

	User.deleteUser(req.params.id, function(err, count) {
		if (err) {
			res.sendStatus(500);
		} else {
			if(count.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.json(count);
			}
		}
	});
});

router.put('/:id', function(req, res, next) {

	User.updateUser(req.params.id, req.body, function(err, rows) {

		if (err) {
			res.sendStatus(500);
		} else {
			if(rows.affectedRows === 0) {
				res.sendStatus(404);
			}
			else {
				res.json(rows);
			}
		}
	});
});

module.exports = router;