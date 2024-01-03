# DATA DICTIONARY

### POSE (`pose`)

| Field           | Type         | Constraints | Description                                                                       |
| --------------- | ------------ | ----------- | --------------------------------------------------------------------------------- |
| pose_id         | INTEGER      | PK          | Unique identifier for the pose (primary key)                                      |
| sanskrit_name   | VARCHAR(50)  | NN UNIQUE   | Sanskrit name of the pose, string up to 50 characters, non-null, unique           |
| english_name    | VARCHAR(50)  | NN UNIQUE   | English name of the pose, string up to 50 characters, non-null, unique            |
| description     | TEXT         | NN          | Detailed description of the pose, text, non-null                                  |
| benefits        | VARCHAR(100) | NN          | Benefits of the pose, string up to 100 characters, non-null                       |
| img_url_svg     | VARCHAR(255) | NN          | URL of the SVG image representing the pose, string up to 255 characters, non-null |
| img_url_jpg     | VARCHAR(255) | NN          | URL of the JPG image representing the pose, string up to 255 characters, non-null |
| img_url_svg_alt | VARCHAR(255) | NN          | Alternative text for the SVG image, string up to 255 characters, non-null         |

### CATEGORY (`category`)

| Field         | Type        | Constraints | Description                                                              |
| ------------- | ----------- | ----------- | ------------------------------------------------------------------------ |
| category_id   | INTEGER     | PK          | Unique identifier for the category (primary key)                         |
| category_name | VARCHAR(50) | NN UNIQUE   | Name of the category, string up to 50 characters, non-null, unique       |
| short_name    | VARCHAR(50) | NN UNIQUE   | Short name of the category, string up to 50 characters, non-null, unique |
| description   | TEXT        | NN          | Detailed description of the category, text, non-null                     |

### LAUNCH (`launch`)

| Field      | Type    | Constraints | Description                                                       |
| ---------- | ------- | ----------- | ----------------------------------------------------------------- |
| id         | INTEGER | PK          | Unique identifier for the transitive relationship (primary key)   |
| start_date | DATE    | NN          | Date when the user launches the session, in date format, non-null |
| end_date   | DATE    | NN          | Date when the user ends the session, in date format, non-null     |

### DIFFICULTY (`difficulty`)

| Field            | Type        | Constraints | Description                                              |
| ---------------- | ----------- | ----------- | -------------------------------------------------------- |
| difficulty_id    | INTEGER     | PK          | Unique identifier for the difficulty level (primary key) |
| difficulty_level | VARCHAR(50) | NN          | Difficulty level, string up to 50 characters, non-null   |

### USERS (`users`)

| Field       | Type         | Constraints | Description                                                         |
| ----------- | ------------ | ----------- | ------------------------------------------------------------------- |
| user_id     | INTEGER      | PK          | Unique identifier for the user (primary key)                        |
| username    | VARCHAR(50)  | NN UNIQUE   | User's username, string up to 50 characters, non-null, unique       |
| email       | VARCHAR(255) | NN UNIQUE   | User's email address, string up to 255 characters, non-null, unique |
| password    | VARCHAR(255) | NN          | User's password, string up to 255 characters, non-null              |
| date_joined | DATE         | NN          | Date when the user joined the application, in date format, non-null |

### SESSIONS (`sessions`)

| Field         | Type         | Constraints | Description                                                                 |
| ------------- | ------------ | ----------- | --------------------------------------------------------------------------- | --- |
| session_id    | INTEGER      | PK          | Unique identifier for the session (primary key)                             |
| title         | VARCHAR(255) |             | Title of the session, string up to 255 characters                           |
| description   | TEXT         |             | Detailed description of the session, text                                   |
| duration      | TIME         |             | Estimated duration of the session in HH:MM:SS format                        |     |
| difficulty_id | INTEGER      | PK, FK      | Associated difficulty level identifier (foreign key referencing DIFFICULTY) |

### SESSIONCUSTOM (`sessionCustom`)

| Field             | Type         | Constraints | Description                                                                 |
| ----------------- | ------------ | ----------- | --------------------------------------------------------------------------- |
| session_custom_id | INTEGER      | PK          | Unique identifier for the custom session (primary key)                      |
| title             | VARCHAR(255) |             | Title of the custom session, string up to 255 characters                    |
| description       | TEXT         |             | Detailed description of the custom session, text                            |
| duration          | TIME         |             | Estimated duration of the session in HH:MM:SS format                        |
| difficulty_id     | INTEGER      | PK, FK      | Associated difficulty level identifier (foreign key referencing DIFFICULTY) |
| user_id           | INTEGER      | PK, FK      | Associated user identifier ( foreign key referencing USERS)                 |
