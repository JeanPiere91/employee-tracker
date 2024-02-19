// Include packages needed for this application
const inquirer = require('inquirer');
const Table = require('easy-table')

// Define URL server 
const URL = "http://localhost";
// Define PORT server 
const PORT = 3001;

// Node v10+ includes a promises module as an alternative to using callbacks with file system methods.
const { writeFile } = require('fs').promises;

// Create an array of questions for user input
const questions = [
      {
        type: 'list',
        name: 'company',
        message: 'What would you like to do?',        
        choices: ['View All Departments',
                  'Add Department',
                  'View All Roles', 
                  'Add Role',
                  'View All Employees', 
                  'Add Employee', 
                  'Update Employee Role',
                  'Quit'],
      }
];

// Helper function that accepts a `deparment` object, sends a POST request and returns the result
const addDepartment = (department) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/department', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(department),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

  // Helper function that accepts a `role` object, sends a POST request and returns the result
const addRole = (role) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(role),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

  const addEmployee = (employee) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

const getDeparments = () =>
  fetch(URL + ":" + PORT + '/api/departments', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

const getRoles = () =>
  fetch(URL + ":" + PORT + '/api/roles', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

const getEmployees = () =>
  fetch(URL + ":" + PORT + '/api/employees', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

async function displayDepartmentQuestion(){
  return inquirer 
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
          },
        ])
        .then((answers) => {
          const newDepartment = {
            name: answers.name.trim(),
          };

          addDepartment(newDepartment)
          .then((data) => {
            console.log(`Added ${answers.name.trim()} to the database`);
            init();
          })
          .catch((err) => console.error(err));
        });
}

async function displayRoleQuestion(){
  let deparmentList = [];
  let dataDepartment = [];
  getDeparments().then((response) => {
    dataDepartment = response.data;
    response.data.map(department => {
      deparmentList.push(department.name);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'What is the name of the role?'
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
          },
          {
            type: 'list',
            name: 'deparment_name',
            message: 'Which deparment does the rol belong to?',        
            choices: deparmentList,
          }
        ])
        .then((answers) => {
          let deparment = 
            dataDepartment.find((deparment) => deparment.name === answers.deparment_name);
          
          const newRole = {
            title: answers.title.trim(),
            salary: answers.salary.trim(),
            department_id: deparment.id,
          };
          
          addRole(newRole)
          .then((data) => {
            console.log(`Added ${answers.title.trim()} to the database`);
            init();
          })
          .catch((err) => console.error(err));
          
        });
}

async function displayEmployeeQuestion(){
  let rolList = [];
  let dataRole = [];
  getRoles().then((response) => {
    dataRole = response.data;
    response.data.map(role => {
      rolList.push(role.title);
    });
  });
  
  let employeeList = ['None'];
  let dataEmployee = [];
  getEmployees().then((response) => {
    dataEmployee = response.data;
    response.data.map(employee => {
      employeeList.push(employee.first_name + ' ' + employee.last_name);
    });
  });

  return inquirer 
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: `What is the employee's first name?`
          },
          {
            type: 'input',
            name: 'last_name',
            message: `What is the employee's last name?`
          },
          {
            type: 'list',
            name: 'rol_title',
            message: `What is the employee's rol?`,
            choices: rolList,
          },
          {
            type: 'list',
            name: 'employee',
            message: `Who is the employee's manager?`,
            choices: employeeList,
          }
        ])
        .then((answers) => {
          
          let role = 
            dataRole.find((role) => role.title === answers.rol_title);
          
          let employee = 
            dataEmployee.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employee);
          
          const newEmployee = {
            first_name: answers.first_name.trim(),
            last_name: answers.last_name.trim(),
            role_id: role.id,
            manager_id: employee == undefined?null: employee.id,
          };
          
          addEmployee(newEmployee)
          .then((data) => {
            console.log(`Added ${answers.first_name.trim()} ${answers.last_name.trim()} to the database`);
            init();
          })
          .catch((err) => console.error(err));
        });
}

async function displayDepartmentsTable(){
  return getDeparments().then((response) => {
    let t = new Table

    response.data.forEach(function(deparment) {
      t.cell('id', deparment.id)
      t.cell('name', deparment.name)
      t.newRow()
    })
    console.log("\n");
    console.log(t.toString());
    init();
  });
}

async function displayRolesTable(){
  return getRoles().then((response) => {
    let t = new Table

    response.data.forEach(function(role) {
      t.cell('id', role.id)
      t.cell('title', role.title)
      t.cell('name', role.name)
      t.cell('salary', role.salary)
      t.newRow()
    })
    console.log("\n");
    console.log(t.toString());
    init();
  });
}

async function displayEmployeesTable(){
  return getEmployees().then((response) => {
    let t = new Table

    response.data.forEach(function(employee) {
      t.cell('id', employee.id)
      t.cell('first_name', employee.first_name)
      t.cell('last_name', employee.last_name)
      t.cell('title', employee.title)
      t.cell('department', employee.department)
      t.cell('salary', employee.salary)
      t.cell('manager', employee.manager)
      t.newRow()
    })
    console.log("\n");
    console.log(t.toString());
    init();
  });
}

// Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    // Use writeFile method imported from fs.promises to use promises instead of
    // a callback function
    .then((answers) => {
      switch(answers.company) {
        case "Add Department": 
          return displayDepartmentQuestion();
        case "View All Departments":
          return displayDepartmentsTable();
        case "Add Role":
          return displayRoleQuestion();
        case "View All Roles":
          return displayRolesTable();
        case "Add Employee":
          return displayEmployeeQuestion();
        case "View All Employees":
          return displayEmployeesTable();
        case "Update Employee Role":
          return updateEmployeeRole();
        default:
          return;
      }
    })
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();