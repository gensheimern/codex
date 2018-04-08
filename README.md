# Lunch Planner

Lunch Planner is a simple and intuitive Web-App, made to simplify the process of making appointments for lunch.

Lunch Planner supports socializing and meeting new people to increse the productivity by creating a pleasant work environment.

The Lunch Planner was commissioned by VSF Experts in the context of the Software Development Project (SEP) at the University of Applied Science Mannheim.


## Getting Started

### Prerequesites

To run the software you need a current installation of [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/), typically installed with Node.js.

To copy the project to your local machine for development and testing you need to clone this git repository. Therefor you need to install a git client on your computer.

### Installation

To get the software running and setting up the development environment, you can look at the following steps:

Clone the repository to your computer
```
git clone https://github.com/gensheimern/codex.git
```

Switch to the created workspace
```
cd codex
```

Select the development branch
```
git checkout development
```

Install the backend dependencies
```
npm install
```

Install the frontend dependencies
```
npm run installclient
```

## Quick start

All of the following commands support hot reloading. If the source code gets changed, the server restarts / page gets refreshed automatically.

To start only the express backend use ```npm start```.

To start only the react frontend use ```npm run react```.

To start the complete development environment, including the express backend with the REST API and the react frontend use ```npm run all```.
After the server and the frontend are ready the application is opened in the default browser.

To get to the application manually visit ```localhost:3000/``` in your browser.

## Project structure

The code is structured in different folders. The backend code is located in the root folder. The frontend code is seperated in the frontend folder.

The servers entry point is ```server.js```. To get started read the Express [documentation](https://expressjs.com/en/starter/hello-world.html).

React components are stored in the ```frontend/src/components``` folder. The root component is called ```App.js```. To get started with React read the [documentation](https://reactjs.org/docs/hello-world.html).

## Running the tests

To validate its functionality this project includes automated tests.

It is very simple to run all the tests.
```
npm test
```
If the output is empty all tests passed, otherwise you will see an error message

If you discover any bugs during testing, feel free, to add an issue on GitHub.

## Deployment

To deploy the code to the test / live system you can follow these steps:
```
Following soon
```

## Built With

- [Node.js](https://nodejs.org) - A JavaScript runtime powering the server
- [Express](https://www.npmjs.com/package/express) - A server side framework
- [React](https://reactjs.org/) - A client side UI framework
- [Bootstrap](https://getbootstrap.com/) - A frontend CSS framework

## Authors

This software is created and maintained by the CODEX-Team.

Developers:
- Diana Beldiman
- Nico Gensheimer
- Max Granzow
- Stella Neser
- Max Stockbauer

Designers:
- Michelle Fox
- Alia Gaa
