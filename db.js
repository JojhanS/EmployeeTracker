const mysql = require('mysql2/promise');

// Create a pool of database connections
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'workplace_db',
  connectionLimit: 10, // Adjust this based on your needs
});

// Function to handle adding a department
const addDepartment = async (name) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query('INSERT INTO department (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
  } finally {
    connection.release();
  }
};

// Function to handle viewing all departments
const getAllDepartments = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM department');
    return rows;
  } finally {
    connection.release();
  }
};

// Function to handle adding an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [firstName, lastName, roleId, managerId]
    );
    return { id: result.insertId, firstName, lastName, roleId, managerId };
  } finally {
    connection.release();
  }
};

// Function to handle viewing all employees
const getAllEmployees = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM employee');
    return rows;
  } finally {
    connection.release();
  }
};

// Function to handle updating an employee's role
const updateEmployeeRole = async (employeeId, roleId) => {
  const connection = await pool.getConnection();
  try {
    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    return { id: employeeId, roleId };
  } finally {
    connection.release();
  }
};

// Function to handle adding a role
const addRole = async (title, salary, departmentId) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [title, salary, departmentId]
    );
    return { id: result.insertId, title, salary, departmentId };
  } finally {
    connection.release();
  }
};

// Function to handle viewing all roles
const getAllRoles = async () => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query('SELECT * FROM role');
    return rows;
  } finally {
    connection.release();
  }
};

module.exports = {
  addDepartment,
  getAllDepartments,
  addEmployee,
  getAllEmployees,
  updateEmployeeRole,
  addRole,
  getAllRoles,
};
