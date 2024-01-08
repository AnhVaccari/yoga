## Back

#### Endpoints

| URL                                             | HTTP Method | Controller              | Method   | Content                        |
| ----------------------------------------------- | ----------- | ----------------------- | -------- | ------------------------------ |
| `auth/login`                                    | `POST`      | AuthController          | `login`  | Login form                     |
| `auth/logout`                                   | `POST`      | AuthController          | `logout` | Logout form                    |
| `/pose`                                         | `GET`       | PoseController          | `read`   | List poses                     |
| `/pose/:id`                                     | `GET`       | PoseController          | `read`   | A specific pose                |
| `/difficulty`                                   | `GET`       | DifficultyController    | `read`   | List difficulties              |
| `/category`                                     | `GET`       | CategoryController      | `read`   | List categories                |
| `/category/:id`                                 | `GET`       | CategoryController      | `read`   | A specific category            |
| `/session`                                      | `GET`       | SessionController       | `read`   | List sessions                  |
| `/session-custom`                               | `GET`       | SessionCustomController | `read`   | List session custom            |
| `/session-custom`                               | `POST`      | SessionCustomController | `create` | Create session custom          |
| `/session-custom/:id`                           | `GET`       | SessionCustomController | `edit`   | A specific session custom      |
| `/session-custom/:id`                           | `PUT`       | SessionCustomController | `edit`   | Update session custom          |
| `/sessionCustom/:id`                            | `DELETE`    | SessionCustomController | `delete` | Delete session custom          |
| `/user`                                         | `GET`       | SessionCustomController | `read`   | List users                     |
| `/sessionCustom/:sessionCustomId/poses/:poseId` | `POST`      | UserController          | `create` | Add pose to sessionCustom      |
| `/sessionCustom/:sessionCustomId/poses/:poseId` | `DELETE`    | SessionCustomController | `delete` | Remove pose from sessionCustom |
