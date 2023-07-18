INSERT INTO department (id, name) VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Engineering');

INSERT INTO role (id, title, salary, department_id) VALUES
  (1, 'Sales Manager', 50000, 1),
  (2, 'Sales Representative', 30000, 1),
  (3, 'Marketing Coordinator', 35000, 2),
  (4, 'Software Engineer', 60000, 3),
  (5, 'QA Engineer', 55000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Mike', 'Johnson', 2, 1),
  (4, 'Emily', 'Davis', 3, NULL),
  (5, 'David', 'Wilson', 4, NULL),
  (6, 'Sarah', 'Anderson', 5, 5);
