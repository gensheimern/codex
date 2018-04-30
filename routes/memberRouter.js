const express = require('express');
const router = express.Router();
const MemberController = require('./memberController');


router.get('/:id', MemberController.getMemberOfTeam);

router.post('/', MemberController.addMember);

router.delete('/:id', MemberController.deleteMember);


module.exports = router;