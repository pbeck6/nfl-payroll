# NFL Payroll

## - Latest updates
- CREATE, READ, UPDATE and DELETE functionality now working on position, positionplayer, positioncoach

## - Dev notes
- When working on FLIP server, need to use nvm to update Node to latest version, or at least v16.5.0.

- app.js needs a db-connector.js file; make a copy of db-template.js, fill in credentials, and rename to db-connector.js. gitignore will ensure credentials are not uploaded to the shared repo on push.

- Reserved words: "position", "name", "number". Must use back-ticks around \`reservedword\` in any query; otherwise mySQL will throw error.
