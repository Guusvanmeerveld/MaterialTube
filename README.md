<p align="center">
  <img src="https://raw.githubusercontent.com/Guusvanmeerveld/MaterialTube/master/src/svg/logo.svg" height="96"/>
</p>

<h1 align="center">MaterialTube</h1>

<p align="center">
  <img src="https://github.com/Guusvanmeerveld/MaterialTube/actions/workflows/deploy.yml/badge.svg" alt="Deploy Site" />
  <img src="https://github.com/Guusvanmeerveld/MaterialTube/actions/workflows/codeql-analysis.yml/badge.svg" alt="CodeQL" />
  <a href="https://hub.docker.com/r/guusvanmeerveld/materialtube">
    <img src="https://shields.io/docker/pulls/guusvanmeerveld/materialtube" alt="Docker pulls" />
  </a>
</p>

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/Guusvanmeerveld/MaterialTube">
    <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku">
  </a>
  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/Guusvanmeerveld/MaterialTube">
    <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify">
  </a>
</p>

<p align="center">
  MaterialTube is a simple client-side only web-client for Invidious servers. It supports using an Invidious account, but also allows you to store all of your data locally. It's main goal is to provide an even greater level of privacy and improve on the current Invidious UI.
</p>

<p align="center">Made using</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
</p>

## Index
- [Index](#index)
- [(Current) Features](#current-features)
- [Configuration](#configuration)
- [Deploy](#deploy)
  - [Using Node.js](#using-nodejs)
  - [Using Docker](#using-docker)
    - [Locally](#locally)
    - [Using Docker Hub](#using-docker-hub)
  - [Using Heroku](#using-heroku)
  - [Using Netlify](#using-netlify)

## (Current) Features
- Browse trending
- Watch video's
- Custom settings

## Configuration
There are a few environmental variables that are able to be set during build time to further customize the application.

- GIT_URL: Set the url to the git repo. Default: https://github.com/Guusvanmeerveld/MaterialTube
- APP_NAME: Set the app name to show to the users. Default: MaterialTube
- DEFAULT_SERVER: Set the invidious server to use by default. Default: invidious.privacy.gd

## Deploy

### Using Node.js

Requirements:
- Node.js v16.x
- Yarn or NPM
- Git

```sh
git clone https://github.com/Guusvanmeerveld/MaterialTube MaterialTube

cd MaterialTube

# Choose Yarn or NPM
yarn install --frozen-lockfile

# npm install --frozen-lockfile

export NEXT_TELEMETRY_DISABLED=1
```

Now you have to choose between export to static HTML (recommended) or running a custom server (improves speed)

Exporting to static HTML:
```sh
yarn export

# npm export
```
The HTML files can be found in the `out` folder. You can now serve them using something like NGINX or Apache

You can also opt to use a custom server, which improves on speed because it will prefetch your request.

Building and starting a custom server:
```sh
yarn build

# npm build

yarn start

# npm start
```

### Using Docker

#### Locally

Requirements:
- Docker
- docker-compose
- Git

```sh
git clone https://github.com/Guusvanmeerveld/MaterialTube MaterialTube

cd MaterialTube

docker build . -t materialtube
```

Now update the `docker-compose.yml` to your needs and start the container:

```sh
docker-compose up -d
```

#### Using Docker Hub

Requirements:
- Docker
- docker-compose

Simply update the following to your needs and put it in a file named `docker-compose.yml`.

```yml
version: "3"

services:
  app:
    build: guusvanmeerveld/materialtube
    container_name: material-tube
    ports:
      - 3000:80
```

Now run `docker-compose up -d` to start the container.

### Using Heroku

Deploying to Heroku is a very simple and highly recommended way of deploying. All you have to do is click the button below, create an account (if you don't already have one) and deploy it. 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Guusvanmeerveld/MaterialTube)

### Using Netlify
Deploying to Netlify is just as easy as deploying to Heroku. Click the button below connect your Git repo and follow the steps to deploy your application.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Guusvanmeerveld/MaterialTube)