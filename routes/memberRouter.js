const router = require('express').Router();
const MemberController = require('./memberController');


router.get('/', MemberController.getMemberOfTeam);

router.post('/:memberId', MemberController.addMember);

router.delete('/:memberId', MemberController.deleteMember);


module.exports = router;
