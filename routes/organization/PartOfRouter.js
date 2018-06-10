const router = require('express').Router();
const PartOfController = require('./PartOfController');
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:organizationId/member', asyncMiddleware(PartOfController.getAllMembers));

router.post('/:organizationId/member/:userId', myMiddleware, asyncMiddleware(PartOfController.addMember));

/* router.delete('/:organization/member/:userId', myMiddleware,
	asyncMiddleware(PartOfController.deleteMember)); */


module.exports = router;
