SELECT *
FROM department a
ORDER BY a.name;

SELECT a.id, a.title, b.name, a.salary
FROM role a
JOIN department b ON b.id = a.department_id;

SELECT a.id, a.first_name, a.last_name, b.title, c.name, CONCAT(d.first_name, ' ', d.last_name) as manager
FROM employee a
JOIN role b ON b.id = a.role_id
JOIN department c ON c.id = b.department_id
LEFT JOIN employee d ON d.id = a.manager_id;