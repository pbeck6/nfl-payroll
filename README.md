# NFL Payroll

## - When working on FLIP server, need to use nvm to update Node to latest version, or at least v16.5.0.

## - app.js needs a db-connector.js file; make a copy of db-template.js, fill in credentials, and rename to db-connector.js. gitignore will ensure credentials are not uploaded to the shared repo on push.

## - mySQL does not like us using the name `position`, as it appears to be a reserved word. Must use back-ticks whenever referencing `position` otherwise mySQL will throw a fit.