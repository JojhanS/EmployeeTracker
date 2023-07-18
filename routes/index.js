const router = require('express').Router();
const departmentRoutes = require('./departmentroutes');
const employeeRoutes = require('./employeeroutes')
const roleRoutes = require('./roleroutes')

router.use('/', departmentRoutes);
router.use('/', employeeRoutes);
router.use('/', roleRoutes);

module.exports = router;
