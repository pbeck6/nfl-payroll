# NFL Payroll

## - To run properly on the FLIP server, use nvm to install Node v16.5.0, and then run React app

## - /ui directory is missing an .env file that specifies what port, and which specific FLIP server, to run the React UI app on:

## .env must include
```
PORT=XXXX
HOST=flipX.engr.oregonstate.edu 
```

## - /rest directory is missing a db-connector.js file, identical to the file for Task 1, that specifies the user's MariaDB login credentials

### Misc.
- /ui/package.json is NOT YET connected to the /rest database with a proxy redirect
