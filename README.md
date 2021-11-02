# NFL Payroll

## - **Latest:** 
Need to copy over db-template.js and remake db-connector.js file. Need to run 'npm install' again to install 'handlebars-helper' module.

## - How to run
- When working on FLIP server, need to use nvm to update Node to latest version, or at least v16.5.0.

- app.js needs a db-connector.js file; make a copy of db-template.js, fill in credentials, and rename to db-connector.js. gitignore will ensure credentials are not uploaded to the shared repo on push.

- The name "position" is a reserved word in mariaDB. Must use back-ticks around \`position\` in any query; otherwise mySQL will throw error.
