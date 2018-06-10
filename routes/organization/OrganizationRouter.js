const OrganizationController = require('./OrganizationController');
const router = require('express').Router();
const asyncMiddleware = require('../asyncMiddleware');


router.get('/', asyncMiddleware(OrganizationController.getAllOrganizations));

router.get('/:organizationId', asyncMiddleware(OrganizationController.getOrganizationById));

router.post('/', asyncMiddleware(OrganizationController.addOrganization));

router.delete('/:organizationId', asyncMiddleware(OrganizationController.deleteOrganization));

router.put('/:organizationId', asyncMiddleware(OrganizationController.updateOrganization));


module.exports = router;
