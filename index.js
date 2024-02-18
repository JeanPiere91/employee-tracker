// Include packages needed for this application
const inquirer = require('inquirer');

// Node v10+ includes a promises module as an alternative to using callbacks with file system methods.
const { writeFile } = require('fs').promises;

// Create an array of questions for user input
const questions = [
      {
        type: 'list',
        name: 'license',
        message: 'What would you like to do?',        
        choices: ['View All Employees', 
                  'Add Employee', 
                  'Update Employee Rol', 
                  'View All Roles', 
                  'Add Role',
                  'View All Departments',
                  'Add Departments',
                  'Quit'],
      }
];

// Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    // Use writeFile method imported from fs.promises to use promises instead of
    // a callback function
    .then((answers) => console.log(answers))
    .then(() => console.log('Asking'))
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();