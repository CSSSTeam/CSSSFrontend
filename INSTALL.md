# Short installation guide

## First, install:
- Node.js = 10.9.0 or later
- angular/cli = 8.3.20 or later

We **highly recommend** and only officially support the latest patch release of each Node.js and Angular/Cli series.

## Install packets
```
npm install
```

## Set up config
Set up data to contect to backend server (We will use our server [link to repository](https://github.com/CSSSTeam/CSSSBackend).) in src/config.json
```
{
  "server": "http://127.0.0.1:8000/",
  "endpoints": {
    "login": "auth/",
    "infoUser": "user/details/"
  }
}
```
server - This is url to the backend server
login - This is the endpoint in the backend server that Api log on.
inforUser - This is the endpoint in the backend server that Api get info about logged user.


## Start up a 
Before starting up set up config.
After that start angular server:
```
ng serve
```
And start the backend server.
