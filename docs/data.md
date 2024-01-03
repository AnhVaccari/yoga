# Data dictionary Fitcode

## User (`user`)

| Champ               | Type         | Spécificités                                    | Description                                                      |
| ------------------- | ------------ | ----------------------------------------------- | ---------------------------------------------------------------- |
| id                  | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | User id                                                          |
| name                | VARCHAR(255) | NOT NULL                                        | User name                                                        |
| email               | VARCHAR(255) | NOT NULL                                        | User email                                                       |
| password            | VARCHAR(255) | NOT NULL                                        | User password                                                    |
| role                | VARCHAR(100) | NOT NULL                                        | User role                                                        |
| isPasswordSecurised | BOOL         | NOT NULL                                        | If the user have changed his default password, this bool is true |
| created_at          | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the user                                        |
| updated_at          | TIMESTAMP    | NULL                                            | Updated date of the user                                         |

## Exercice (`exercice`)

| Champ       | Type         | Spécificités                                    | Description                                                |
| ----------- | ------------ | ----------------------------------------------- | ---------------------------------------------------------- |
| id          | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | Exercice id                                                |
| user_id     | INT          | FOREIGN KEY, NOT NULL, UNSIGNED,                | User id                                                    |
| image_id    | INT          | FOREIGN KEY, NOT NULL                           | Exercice image.id                                          |
| title       | VARCHAR(255) | NOT NULL                                        | Exercice name                                              |
| description | TEXT         | NULL                                            | Exercice desciption                                        |
| tips        | TEXT         | NULL                                            | Exercice tips from coach                                   |
| status      | INT          |                                                 | Exercice status : 0 -> private, 1 -> public, 3 -> archived |
| created_at  | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the Exercice                              |
| updated_at  | TIMESTAMP    | NULL                                            | Updated date of the Exercice                               |

## ExerciceCustom (`exercice_custom`)

| Champ                | Type      | Spécificités                                    | Description                                                                 |
| -------------------- | --------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| id                   | INT       | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | ExerciceCustom id                                                           |
| exercice_id          | INT       | FOREIGN KEY, NOT NULL, UNSIGNED,                | Exercice id                                                                 |
| exercice_settings_id | INT       | FOREIGN KEY, NOT NULL, UNSIGNED,                | ExerciceSettings id                                                         |
| orderNumber          | INT       | NOT NULL                                        | Exercice order                                                              |
| appreciation         | INT       | NULL                                            | Average of exercices personnal appreciations, from self difficulty feelings |
| created_at           | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the ExerciceCustom                                         |
| updated_at           | TIMESTAMP | NULL                                            | Updated date of the ExerciceCustom                                          |

## ExerciceSettings (`exercice_settings`)

| Champ            | Type      | Spécificités                                    | Description                           |
| ---------------- | --------- | ----------------------------------------------- | ------------------------------------- |
| id               | INT       | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | ExerciceSettings id                   |
| weight           | INT       | NULL                                            | Exercice weight                       |
| rest_duration    | INT       | NULL                                            | Exercice rest duration in seconds     |
| count_serie      | INT       | DEFAULT 1                                       | Exercice count serie                  |
| count_repetition | INT       | NULL                                            | Exercice count repetition             |
| duration         | INT       | NULL                                            | Exercice duration in seconds          |
| created_at       | TIMESTAMP | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the ExerciceSettings |
| updated_at       | TIMESTAMP | NULL                                            | Updated date of the ExerciceSettings  |

## Session (`session`)

| Champ                | Type         | Spécificités                                    | Description                                                                 |
| -------------------- | ------------ | ----------------------------------------------- | --------------------------------------------------------------------------- |
| id                   | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | Session id                                                                  |
| user_id              | INT          | FOREIGN KEY, NOT NULL, UNSIGNED,                | User id                                                                     |
| creator_id           | INT          | FOREIGN KEY, NOT NULL, UNSIGNED                 | Creator user.id                                                             |
| historic_tag         | VARCHAR(255) | NOT NULL                                        | UUID to identify the session and its parents for historic                   |
| title                | VARCHAR(255) | NOT NULL                                        | Session name                                                                |
| image_id             | INT          | FOREIGN KEY, NOT NULL                           | Session image                                                               |
| description          | TEXT         | NULL                                            | Session desciption                                                          |
| tips                 | TEXT         | NULL                                            | Session tips from coach                                                     |
| start_time           | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Exercice start datetime                                                     |
| end_time             | TIMESTAMP    | NULL                                            | Exercice end datetime                                                       |
| average_appreciation | INT          | NULL                                            | Average of exercices personnal appreciations, from self difficulty feelings |
| is_public            | BOOL         | NOT NULL, DEFAULT FALSE                         | Session status                                                              |
| created_at           | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the Session                                                |
| updated_at           | TIMESTAMP    | NULL                                            | Updated date of the Session                                                 |

## LabelExercice (`label_exercice`)

| Champ      | Type         | Spécificités                                    | Description                  |
| ---------- | ------------ | ----------------------------------------------- | ---------------------------- |
| id         | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | LabelExercice id             |
| name       | VARCHAR(255) | NOT NULL                                        | LabelExercice name           |
| slug       | VARCHAR(255) | NOT NULL                                        | LabelExercice slug           |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the expense |
| updated_at | TIMESTAMP    | NULL                                            | Updated date of the expense  |

## LabelSession (`label_session`)

| Champ      | Type         | Spécificités                                    | Description                  |
| ---------- | ------------ | ----------------------------------------------- | ---------------------------- |
| id         | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | LabelSession id              |
| name       | VARCHAR(255) | NOT NULL                                        | LabelSession name            |
| slug       | VARCHAR(255) | NOT NULL                                        | LabelSession slug            |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the expense |
| updated_at | TIMESTAMP    | NULL                                            | Updated date of the expense  |

## Image (`image`)

| Champ      | Type         | Spécificités                                    | Description                  |
| ---------- | ------------ | ----------------------------------------------- | ---------------------------- |
| id         | INT          | PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT | Image id                     |
| user_id    | INT          | FOREIGN KEY, NOT NULL, UNSIGNED,                | User creator id              |
| url        | VARCHAR(255) | NOT NULL                                        | Image url                    |
| is_public  | BOOL         | NOT NULL, DEFAULT FALSE                         | Image status                 |
| created_at | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP             | Creation date of the expense |
| updated_at | TIMESTAMP    | NULL                                            | Updated date of the expense  |
