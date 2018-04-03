const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
	res.json({
		result: "Hello World"
	});
});

module.exports = router;