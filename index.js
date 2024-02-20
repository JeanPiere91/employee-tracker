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
                  'Delete Department',
                  'View All Roles', 
                  'Add Role',
                  'Delete Role',
                  'View All Employees', 
                  'View Employees By Manager',
                  'View Employees By Deparment',
                  'Add Employee', 
                  'Delete Employee',
                  'Update Employee Role',
                  'Update Employee Manager',
                  'View Budget for deparment',
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

  const deleteDepartment = (id) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/department/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
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

const deleteRole = (id) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/role/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
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

  const deleteEmployee = (id) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/employee/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });
  
  const updateEmployeeRole = (id, newRole) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/employee-role/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRole),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

const updateEmployeeManager = (id, newManager) =>
  // Fetch accepts a URL and an options object where you can declare the HTTP method, the request body, and any headers.
  fetch(URL + ":" + PORT + '/api/employee-manager/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newManager),
  })
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

// function to fetch all Departments
const getDeparments = () =>
  fetch(URL + ":" + PORT + '/api/departments', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

// function to fetch all Roles
const getRoles = () =>
  fetch(URL + ":" + PORT + '/api/roles', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

// function to fetch all Employees
const getEmployees = () =>
  fetch(URL + ":" + PORT + '/api/employees', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

// function to fetch Employees by Manager
const getEmployeesByManager = () =>
  fetch(URL + ":" + PORT + '/api/employees-by-manager', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);

// function to fetch Employees by Department
const getEmployeesByDepartment = () =>
  fetch(URL + ":" + PORT + '/api/employees-by-department', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);
    
// function to fetch Budget by Department
const getBudgetByDepartment = () =>
  fetch(URL + ":" + PORT + '/api/budget-by-department', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => data);
    
//function to properly set up department questions to be added
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

//function to properly set up role questions to be added
async function displayRoleQuestion(){
  let deparmentList = [];
  let dataDepartment = [];
  await getDeparments().then((response) => {
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

//function to properly set up employee questions to be added
async function displayEmployeeQuestion(){
  let rolList = [];
  let dataRole = [];
  await getRoles().then((response) => {
    dataRole = response.data;
    response.data.map(role => {
      rolList.push(role.title);
    });
  });
  
  let employeeList = ['None'];
  let dataEmployee = [];
  await getEmployees().then((response) => {
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

//function to properly set up employee questions to be updated role
async function displayEmployeeRoleQuestion(){
  let rolList = [];
  let dataRole = [];
  await getRoles().then((response) => {
    dataRole = response.data;
    response.data.map(role => {
      rolList.push(role.title);
    });
  });
  
  let employeeList = [];
  let dataEmployee = [];
  await getEmployees().then((response) => {
    dataEmployee = response.data;
    response.data.map(employee => {
      employeeList.push(employee.first_name + ' ' + employee.last_name);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: `Select an employee`,
            choices: employeeList,
          },
          {
            type: 'list',
            name: 'new_rol_title',
            message: `What is the employee's new rol?`,
            choices: rolList,
          }
        ])
        .then((answers) => {
          
          let role = 
            dataRole.find((role) => role.title === answers.new_rol_title);
          
          let employee = 
            dataEmployee.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employee);
          
          const newRole = {
            role_id: role.id,
          };
          
          updateEmployeeRole(employee.id, newRole)
          .then((data) => {
            console.log(`Updated ${answers.employee.trim()} Role to the database`);
            init();
          })
          .catch((err) => console.error(err));
        });
}

//function to properly set up employee questions to be updated manager
async function displayEmployeeManagerQuestion(){
  let employeeList = [];
  let dataEmployee = [];
  await getEmployees().then((response) => {
    dataEmployee = response.data;
    response.data.map(employee => {
      employeeList.push(employee.first_name + ' ' + employee.last_name);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: `Select an employee`,
            choices: employeeList,
          },
          {
            type: 'list',
            name: 'new_manager',
            message: `What is the employee's new manager?`,
            choices: employeeList,
          }
        ])
        .then((answers) => {
          
          let employee = 
            dataEmployee.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employee);

          let manager = 
            dataEmployee.find((manager) => manager.first_name + ' ' + manager.last_name === answers.new_manager);
          
          const newManager = {
            manager_id: manager.id,
          };
          
          updateEmployeeManager(employee.id, newManager)
          .then((data) => {
            console.log(`Updated ${answers.employee.trim()} Manager to the database`);
            init();
          })
          .catch((err) => console.error(err));
        });
}

//function to delete department
async function displayDepartmentsToDelete(){
  let deparmentList = [];
  let dataDepartment = [];
  await getDeparments().then((response) => {
    dataDepartment = response.data;
    response.data.map(department => {
      deparmentList.push(department.name);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'list',
            name: 'deparment_name',
            message: 'Which deparment would you like to delete?',
            choices: deparmentList,
          }
        ])
        .then((answers) => {
          let deparment = 
            dataDepartment.find((deparment) => deparment.name === answers.deparment_name);
          
          deleteDepartment(deparment.id)
          .then((data) => {
            console.log(`Department ${answers.deparment_name.trim()} deleted from the database`);
            init();
          })
          .catch((err) => console.error(err));
          
        });
}

//function to delete role
async function displayRolesToDelete(){
  let rolList = [];
  let dataRole = [];
  await getRoles().then((response) => {
    dataRole = response.data;
    response.data.map(role => {
      rolList.push(role.title);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'list',
            name: 'role_name',
            message: 'Which role would you like to delete?',
            choices: rolList,
          }
        ])
        .then((answers) => {
          let role = 
            dataRole.find((role) => role.title === answers.role_name);
          
          deleteRole(role.id)
          .then((data) => {
            console.log(`Role ${answers.role_name.trim()} deleted from the database`);
            init();
          })
          .catch((err) => console.error(err));
          
        });
}

//function to delete employee
async function displayEmployeesToDelete(){
  let employeeList = [];
  let dataEmployee = [];
  await getEmployees().then((response) => {
    dataEmployee = response.data;
    response.data.map(employee => {
      employeeList.push(employee.first_name + ' ' + employee.last_name);
    });
  });
  
  return inquirer 
        .prompt([
          {
            type: 'list',
            name: 'employee_name',
            message: 'Which employee would you like to delete?',
            choices: employeeList,
          }
        ])
        .then((answers) => {
          let employee = 
            dataEmployee.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employee_name);
          
          deleteEmployee(employee.id)
          .then((data) => {
            console.log(`Employee ${answers.first_name.trim()} ${answers.last_name.trim()} deleted from the database`);
            init();
          })
          .catch((err) => console.error(err));
          
        });
}

//function to set up departments on table format
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

//function to set up roles on table format
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

//function to set up employees on table format
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

//function to set up employees by manager on table format
async function displayEmployeesByManagerTable(){
  return getEmployeesByManager().then((response) => {
    let t = new Table

    response.data.forEach(function(employee) {
      t.cell('manager', employee.manager)
      t.cell('employee', employee.employee)
      t.newRow()
    })
    console.log("\n");
    console.log(t.toString());
    init();
  });
}

//function to set up employees by department on table format
async function displayEmployeesByDepartmentTable(){
  return getEmployeesByDepartment().then((response) => {
    let t = new Table

    response.data.forEach(function(employee) {
      t.cell('department', employee.department)
      t.cell('employee', employee.employee)
      t.newRow()
    })
    console.log("\n");
    console.log(t.toString());
    init();
  });
}

//function to set up budget by department on table format
async function displayBudgetByDepartmentTable(){
  return getBudgetByDepartment().then((response) => {
    let t = new Table

    response.data.forEach(function(deparment) {
      t.cell('department', deparment.department)
      t.cell('budget', deparment.budget)
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
        case "Delete Department": 
          return displayDepartmentsToDelete();
        case "View All Departments":
          return displayDepartmentsTable();
        case "Add Role":
          return displayRoleQuestion();
        case "Delete Role": 
          return displayRolesToDelete();
        case "View All Roles":
          return displayRolesTable();
        case "Add Employee":
          return displayEmployeeQuestion();
        case "Delete Employee": 
          return displayEmployeesToDelete();
        case "View All Employees":
          return displayEmployeesTable();
        case "View Employees By Manager":
            return displayEmployeesByManagerTable();
        case "View Employees By Deparment":
            return displayEmployeesByDepartmentTable();
        case "Update Employee Role":
          return displayEmployeeRoleQuestion();
        case "Update Employee Manager":
            return displayEmployeeManagerQuestion();
        case "View Budget for deparment":
            return displayBudgetByDepartmentTable();
        default:
          return;
      }
    })
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();