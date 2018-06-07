const router = require('express').Router();
const MemberController = require('./memberController');
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:teamId/member', asyncMiddleware(MemberController.getMemberOfTeam));

router.post('/:teamId/member/:userId', myMiddleware, asyncMiddleware(MemberController.addMember));

router.delete('/:teamId/member/:userId', myMiddleware, asyncMiddleware(MemberController.deleteMember));


module.exports = router;
