const router = require('express').Router();
const MemberController = require('./memberController');
const { asyncMiddleware } = require('./errorHandler');


router.get('/:teamId/member', asyncMiddleware(MemberController.getMemberOfTeam));

router.post('/:teamId/member/:memberId', asyncMiddleware(MemberController.addMember));

router.delete('/:teamId/member/:memberId', asyncMiddleware(MemberController.deleteMember));


module.exports = router;
