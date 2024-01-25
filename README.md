<div>
  <h1 align="center">Yoga Training App API</h1>

  <div align="center">
    <a href="https://github.com/AnhVaccari/yoga/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/AnhVaccari/yoga"></a>
    <a href="https://www.linkedin.com/in/anh-vaccari-dev/"><img alt="LinkedIn Profile" src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white"></a>
    <a href="https://github.com/AnhVaccari/yoga/blob/master/LICENSE.md"><img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
  </div>
</div>

Yoga Training App is a dynamic RESTful API designed for building yoga-focused applications. It provides endpoints for managing various aspects of yoga sessions, including categories, custom sessions, poses, user profiles, difficulties, and more.

<i><b>Notice: This application is not yet complete and reaches its MVP stage for a capstone project. It serves as a foundational stepping stone for a fully-featured yoga practice and session management tool</b></i>

## API Endpoints

### Swagger UI
- `GET /docs`: display all endpoints, documentation and playground this API.


### Categories

- `GET /category`: Retrieves all categories of yoga sessions.
- `GET /category/{id}`: Fetches a specific yoga category by ID.

### Custom Sessions

- `GET /session-custom`: Lists all user-created custom yoga sessions.
- `POST /session-custom`: Allows creation of a new custom yoga session.
- `GET /session-custom/{id}`: Retrieves the details of a particular custom session.
- `PATCH /session-custom/{id}`: Updates the specified custom session.
- `DELETE /session-custom/{id}`: Deletes a custom session.
- `POST /session-custom/{sessionCustomId}/poses/{poseId}`: Adds a yoga pose to a custom session.
- `DELETE /session-custom/{sessionCustomId}/poses/{poseId}`: Removes a yoga pose from a custom session.

### Difficulties

- `GET /difficulty`: Gets all levels of yoga session difficulties.

### Sessions

- `GET /session/search`: Searches for yoga sessions based on provided criteria.
- `GET /session`: Lists all available yoga sessions.
- `GET /session/{id}`: Retrieves a specific yoga session by ID.
- `GET /session/difficulty/{id}`: Fetches yoga sessions filtered by difficulty level.
- `POST /session/{sessionId}/start`: Starts a yoga session, marking the beginning time.
- `POST /session/{sessionId}/stop`: Stops an ongoing yoga session, recording the end time.

### User Management

- `GET /user/profile`: Fetches the profile information of the authenticated user.
- `GET /user/history`: Retrieves the history of sessions launched by the user.
- `POST /user`: Creates a new user account.
- `GET /user/session/active`: Fetches any active session that the user is currently engaged in.

### Poses

- `GET /pose`: Lists all yoga poses with their descriptions and associated difficulty levels.
- `GET /pose/{id}`: Retrieves detailed information on a particular yoga pose.
- `GET /pose/difficulty/{id}`: Filters yoga poses by difficulty level.

### Auth

- `POST /auth/login`: Authenticates a user and issues an access token.

## Database Summary

The backend database supports the API with structured tables that hold data related to yoga categories, difficulty levels, individual poses, and user sessions. It enables the safe storage and retrieval of user data, sessions, and yoga-related information with referential integrity ensured via foreign key constraints. .

## Current Features

- [X] **User Authentication**: Securely manage user sessions with a token-based authentication system, allowing users to log in to their accounts.

- [X] **User Profile Management**: Users can retrieve their profile data after logging in, providing a personalized experience.

- [X] **Yoga Session Tracking**: Users can start and stop yoga sessions, with the API recording the timing of each session.

- [X] **Custom Yoga Sessions**: Create and manage custom yoga sessions by adding specific poses to a session.

- [X] **Yoga Pose Directory**: Access a library of yoga poses complete with details like Sanskrit names, English names, descriptions, benefits, and associated images.

- [X] **Session and Pose Difficulty Levels**: Retrieve the difficulty level of each session or pose to tailor the yoga practice to different skill levels.

- [X] **Category Management**: Organize yoga content by categories, such as Core Yoga or Seated Yoga.

- [X] **Search Functionality**: Search for yoga sessions using various filters to find the perfect session for the moment.

## Upcoming Features

- [ ] Expanding search functionality to include additional criteria for a refined session search experience.

- [ ] Enhanced profile management features, allowing users to update their profile information.

- [ ] A reminder system ensuring users maintain consistency in their yoga practice.

- [ ] A more comprehensive and user-friendly interface for easy navigation and a superior user experience.


## Tech Stack

- [Typescript](https://www.typescriptlang.org/) – language
- [NestJS](https://nestjs.com) – framework
- [TypeORM](https://typeorm.io) - orm
- [MySQL](https://www.mysql.com) - database
- [Render](https://render.com) – hosting node
- [Filess](https://filess.io) – hosting mysql

## Getting Started

### Prerequisites

Here's what you need to be able to run Yoga Training App API:

- Node.js (version >= 18)
- An instance of MySQL 8.0 or higher

### 1. Clone the repository

```shell
git clone https://github.com/AnhVaccari/yoga
cd yoga-flutter-app
```

## 2. Running the app in Docker (if you use Docker)
There are three containers in the configuration :

- **app**: The app container node.js version 18 - port 3000
- **db**: The database container MySQL version 8 - port 3306
- **adminer**: The adminer container - port 8080

```bash
# build and launch the app in docker
docker compose up
```

And start the app container

### 3. Install dependencies (skip if you use Docker)

```shell
  npm ci
```

### 3. Create your database

- Create a new database in your MySQL locally (or in the interface `adminer` in Docker) (for example: `yoga-app`)
- And import the file SQL `docs/import.sql` in your database

### 4. Configure .env

```shell
  cp .env.example .env
```
And change the value in the file `.env` to your configuration database

## 5. Running the local app (skip if you use Docker)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## List of Users for the API

The file `docs/imports.sql` contains 3 users for example : 

| Username | Password |
|----------|:--------:|
| `Ana`    | `azerty` |
| `John`   |   ` `    |
| `Marie`  |   ` `    |

## Demo API

- [https://render.com](https://render.com)

## Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull
requests are warmly welcome.

### Our Contributors ✨

<a href="https://github.com/AnhVaccari/yoga/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AnhVaccari/yoga" />
</a>

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

We hope that this enhanced version of the README will be helpful for sharing your Yoga Flutter App
with other developers and users.

If you have any further questions or need additional assistance, feel free to ask. Happy coding!
