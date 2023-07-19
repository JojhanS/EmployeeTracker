const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /departments - Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await db.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    console.error('Error retrieving departments:', error);
    res.status(500).json({ error: 'Failed to retrieve departments' });
  }
});

// POST /departments - Add a new department
router.post('/', async (req, res) => {
  const { name } = req.body;

  try {
    const newDepartment = await db.addDepartment(name);
    res.status(200).json(newDepartment);
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ error: 'Failed to add department' });
  }
});

module.exports = router;
