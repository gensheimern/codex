const PartOfController = require('../organization/PartOfController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');
const myMiddleware = require('../../middleware/myMiddleware');


router.get('/:userId/organizations', myMiddleware, asyncMiddleware(PartOfController.getOrganizationsOfUser));

router.get('/:userId/organizations/active', myMiddleware, asyncMiddleware(PartOfController.getActiveOrganizationsOfUser));

router.post('/:userId/organizations/:organizationId', myMiddleware, asyncMiddleware(PartOfController.joinOrganization));

router.delete('/:userId/organizations/:organizationId', myMiddleware, asyncMiddleware(PartOfController.leaveOrganization));


module.exports = router;
