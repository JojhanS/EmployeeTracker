const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /employees - Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await db.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Failed to retrieve employees' });
  }
});

// POST /employees - Add a new employee
router.post('/', async (req, res) => {
  const { firstName, lastName, roleId, managerId } = req.body;

  try {
    const newEmployee = await db.addEmployee(firstName, lastName, roleId, managerId);
    res.status(200).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

module.exports = router;
