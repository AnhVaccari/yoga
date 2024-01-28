## Back

#### Endpoints

| URL                                             | HTTP Method | Controller              | Method                    | Content                        |
| ----------------------------------------------- | ----------- | ----------------------- | ------------------------- | ------------------------------ |
| `auth/login`                                    | `POST`      | AuthController          | `login`                   | Login form                     |
| `auth/logout`                                   | `POST`      | AuthController          | `logout`                  | Logout form                    |
| `/pose`                                         | `GET`       | PoseController          | `getAllPoses`             | List poses                     |
| `/pose/:id`                                     | `GET`       | PoseController          | `getOnePose`              | A specific pose                |
| `/difficulty`                                   | `GET`       | DifficultyController    | `getAllDifficulties`      | List difficulties              |
| `/category`                                     | `GET`       | CategoryController      | `getAllCategorie`         | List categories                |
| `/category/:id`                                 | `GET`       | CategoryController      | `getOneCategory`          | A specific category            |
| `/session`                                      | `GET`       | SessionController       | `getAllSessions`          | List sessions                  |
| `/session-custom`                               | `GET`       | SessionCustomController | `getAllSessionCustoms`    | List session custom            |
| `/session-custom`                               | `POST`      | SessionCustomController | `create`                  | Create session custom          |
| `/session-custom/:id`                           | `GET`       | SessionCustomController | `getSessionCustom`        | A specific session custom      |
| `/session-custom/:id`                           | `PATCH`     | SessionCustomController | `edit`                    | Update session custom          |
| `/sessionCustom/:id`                            | `DELETE`    | SessionCustomController | `delete`                  | Delete session custom          |
| `/user/profile`                                 | `GET`       | UserController          | `read`                    | User profile                   |
| `/sessionCustom/:sessionCustomId/poses/:poseId` | `POST`      | SessionCustomController | `create`                  | Add pose to sessionCustom      |
| `/sessionCustom/:sessionCustomId/poses/:poseId` | `DELETE`    | SessionCustomController | `delete`                  | Remove pose from sessionCustom |
| `/session/:sessionId/start`                     | `POST`      | SessionController       | `startSession`            | Start a session                |
| `/session/:sessionId/stop`                      | `POST`      | SessionController       | `stopSession`             | Stop a session                 |
| `/pose/difficulty/:id`                          | `GET`       | PoseController          | `getPosesByDifficulty`    | Get poses by difficulty        |
| `/session/difficulty/:id`                       | `GET`       | SessionController       | `getSessionsByDifficulty` | Get sessions by difficulty     |
| `/session/search`                               | `GET`       | SessionController       | `search`                  | Search for session by keyword  |
| `/user/statistics`                              | `GET`       | SessionController       | `getStatistics`           | Get statistics                 |
