const router = require('express').Router();
const MemberController = require('./memberController');


router.get('/:memberId', MemberController.getMemberOfTeam);

router.post('/', MemberController.addMember);

router.delete('/:memberId', MemberController.deleteMember);


module.exports = router;
