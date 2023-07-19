const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /roles - Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await db.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error retrieving roles:', error);
    res.status(500).json({ error: 'Failed to retrieve roles' });
  }
});

// POST /roles - Add a new role
router.post('/', async (req, res) => {
  const { title, salary, departmentId } = req.body;

  try {
    const newRole = await db.addRole(title, salary, departmentId);
    res.status(200).json(newRole);
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).json({ error: 'Failed to add role' });
  }
});

module.exports = router;
