# DATA DICTIONARY

### POSE (`pose`)

| Field           | Type         | Constraints | Description                                                                       |
| --------------- | ------------ | ----------- | --------------------------------------------------------------------------------- |
| id              | INTEGER      | PK          | Unique identifier for the pose (primary key)                                      |
| sanskrit_name   | VARCHAR(50)  | NN UNIQUE   | Sanskrit name of the pose, string up to 50 characters, non-null, unique           |
| english_name    | VARCHAR(50)  | NN UNIQUE   | English name of the pose, string up to 50 characters, non-null, unique            |
| description     | TEXT         | NN          | Detailed description of the pose, text, non-null                                  |
| benefits        | VARCHAR(100) | NN          | Benefits of the pose, string up to 100 characters, non-null                       |
| img_url_svg     | VARCHAR(255) | NN          | URL of the SVG image representing the pose, string up to 255 characters, non-null |
| img_url_jpg     | VARCHAR(255) | NN          | URL of the JPG image representing the pose, string up to 255 characters, non-null |
| img_url_svg_alt | VARCHAR(255) | NN          | Alternative text for the SVG image, string up to 255 characters, non-null         |
| difficultyId    | INTEGER      | FK          | Associated difficulty level identifier (foreign key referencing DIFFICULTY)       |

### CATEGORY (`category`)\_

| Field         | Type        | Constraints | Description                                                        |
| ------------- | ----------- | ----------- | ------------------------------------------------------------------ |
| id            | INTEGER     | PK          | Unique identifier for the category (primary key)                   |
| category_name | VARCHAR(50) | NN UNIQUE   | Name of the category, string up to 50 characters, non-null, unique |
| description   | TEXT        | NN          | Detailed description of the category, text, non-null               |

### DIFFICULTY (`difficulty`)

| Field            | Type        | Constraints | Description                                              |
| ---------------- | ----------- | ----------- | -------------------------------------------------------- |
| id               | INTEGER     | PK          | Unique identifier for the difficulty level (primary key) |
| difficulty_level | VARCHAR(50) | NN          | Difficulty level, string up to 50 characters, non-null   |

### USER (`user`)

| Field       | Type         | Constraints | Description                                                         |
| ----------- | ------------ | ----------- | ------------------------------------------------------------------- |
| id          | INTEGER      | PK          | Unique identifier for the user (primary key)                        |
| username    | VARCHAR(50)  | NN UNIQUE   | User's username, string up to 50 characters, non-null, unique       |
| email       | VARCHAR(255) | NN UNIQUE   | User's email address, string up to 255 characters, non-null, unique |
| password    | VARCHAR(255) | NN          | User's password, string up to 255 characters, non-null              |
| date_joined | DATE         | NN          | Date when the user joined the application, in date format, non-null |

### SESSION (`session`)

| Field        | Type         | Constraints | Description                                                                 |
| ------------ | ------------ | ----------- | --------------------------------------------------------------------------- |
| id           | INTEGER      | PK          | Unique identifier for the custom session (primary key)                      |
| title        | VARCHAR(255) |             | Title of the custom session, string up to 255 characters                    |
| description  | TEXT         |             | Detailed description of the custom session, text                            |
| duration     | INTEGER      |             | Estimated duration of the session in MM:SS format                           |
| difficultyId | INTEGER      | FK          | Associated difficulty level identifier (foreign key referencing DIFFICULTY) |

### SESSIONCUSTOM (`sessionCustom`)

| Field        | Type         | Constraints | Description                                                      |
| ------------ | ------------ | ----------- | ---------------------------------------------------------------- |
| id           | INTEGER      | PK          | Unique identifier for the custom session (primary key)           |
| title        | VARCHAR(255) |             | Title of the custom session, string up to 255 characters         |
| description  | TEXT         |             | Detailed description of the custom session, text                 |
| duration     | INTEGER      |             | Estimated duration of the session in MM:SS format                |
| difficultyId | INTEGER      | FK          | Associated user identifier ( foreign key referencing DIFFICULTY) |
| userId       | INTEGER      | FK          | Associated user identifier ( foreign key referencing USER)       |

### LAUNCHED_SESSION (`launched_session`)

| Field      | Type    | Constraints | Description                                                           |
| ---------- | ------- | ----------- | --------------------------------------------------------------------- |
| user_id    | INTEGER | PK, FK      | Foreign key referencing `USER` (part of the composite primary key)    |
| session_id | INTEGER | PK, FK      | Foreign key referencing `SESSION` (part of the composite primary key) |
| start_date | DATE    | PK          | Start date of the session, part of the composite primary key          |
| end_date   | DATE    | Nullable    | Date when the session ends, nullable                                  |

Cette table enregistre les sessions lancées par les utilisateurs. La combinaison de `user_id`, `session_id`, et `start_date` forme une clé primaire composite, assurant qu'une session spécifique lancée par un utilisateur à une date donnée est unique.

### SESSIONCUSTOM_POSE (`sessionCustom_pose`)

| Field           | Type    | Constraints | Description                                                       |
| --------------- | ------- | ----------- | ----------------------------------------------------------------- |
| sessionCustomId | INTEGER | PK, FK      | Foreign key referencing `SESSIONCUSTOM` (part of the primary key) |
| poseId          | INTEGER | PK, FK      | Foreign key referencing `POSE` (part of the primary key)          |

Cette table crée une relation plusieurs-à-plusieurs entre les entités `SESSIONCUSTOM` et `POSE`. Chaque enregistrement indique qu'une pose donnée fait partie d'une session personnalisée spécifique.

### POSE_CATEGORY (`pose_category`)

| Field      | Type    | Constraints | Description                                                  |
| ---------- | ------- | ----------- | ------------------------------------------------------------ |
| poseId     | INTEGER | PK, FK      | Foreign key referencing `POSE` (part of the primary key)     |
| categoryId | INTEGER | PK, FK      | Foreign key referencing `CATEGORY` (part of the primary key) |

Cette table établit une relation plusieurs-à-plusieurs entre les entités `POSE` et `CATEGORY`. Chaque enregistrement associe une pose à une catégorie spécifique.

### SESSION_POSE (`session_pose`)

| Field     | Type    | Constraints | Description                                                 |
| --------- | ------- | ----------- | ----------------------------------------------------------- |
| sessionId | INTEGER | PK, FK      | Foreign key referencing `SESSION` (part of the primary key) |
| poseId    | INTEGER | PK, FK      | Foreign key referencing `POSE` (part of the primary key)    |

Cette table crée une relation plusieurs-à-plusieurs entre les entités `SESSION` et `POSE`. Chaque enregistrement indique qu'une pose donnée fait partie d'une session spécifique.
