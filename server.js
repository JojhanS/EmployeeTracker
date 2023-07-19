const express = require('express');
const inquirer = require('inquirer');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const roleRoutes = require('./routes/roleRoutes');
const db = require('./db');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/departments', departmentRoutes);
app.use('/employees', employeeRoutes);
app.use('/roles', roleRoutes);

const addDepartment = async () => {
  const departmentData = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the department name:',
    },
  ]);

  try {
    const newDepartment = await db.addDepartment(departmentData.name);
    console.log('Department added successfully!', newDepartment);
  } catch (error) {
    console.error('Error adding department:', error);
  }
};

const viewDepartments = async () => {
  try {
    const departments = await db.getAllDepartments();
    console.log('Departments:');
    console.table(departments);
  } catch (error) {
    console.error('Error retrieving departments:', error);
  }
};

const updateEmployeeRole = async () => {
  const { employeeId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee to update:',
    },
  ]);

  const { roleId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter the ID of the new role:',
    },
  ]);

  try {
    const updatedEmployee = await db.updateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated successfully!', updatedEmployee);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};

const addRole = async () => {
  const roleData = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the role salary:',
    },
    {
      type: 'number',
      name: 'departmentId',
      message: 'Enter the ID of the department:',
    },
  ]);

  try {
    const newRole = await db.addRole(roleData.title, roleData.salary, roleData.departmentId);
    console.log('Role added successfully!', newRole);
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

const viewEmployees = async () => {
  try {
    const employees = await db.getAllEmployees();
    console.log('Employees:');
    console.table(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error.response.data);
  }
};

const selectAction = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Select an action:',
      choices: [
        'Add a department',
        'View departments',
        'Update employee role',
        'Add a role',
        'Add an employee',
        'View employees',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'Add a department':
      await addDepartment();
      break;
    case 'View departments':
      await viewDepartments();
      break;
    case 'Update employee role':
      await updateEmployeeRole();
      break;
    case 'Add a role':
      await addRole();
      break;
    case 'Add an employee':
      await addEmployee();
      break;
    case 'View employees':
      await viewEmployees();
      break;
    case 'Exit':
      console.log('Exiting the employee tracker...');
      process.exit();
    default:
      console.log('Invalid action.');
      break;
  }

  await selectAction();
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  selectAction();
});
