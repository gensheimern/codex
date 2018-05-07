const router = require('express').Router();
const MemberController = require('./memberController');


router.get('/:teamId/member', MemberController.getMemberOfTeam);

router.post('/:teamId/member/:memberId', MemberController.addMember);

router.delete('/:teamId/member/:memberId', MemberController.deleteMember);


module.exports = router;
