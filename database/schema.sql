// This file outlines the initial database schema design for the application.
// The schema is designed to support current and future application functionality.

// Use this schema as a guide for database creation and migrations.

// Todo schema
table: todos {
  id int [pk, increment] // Primary key
  text string // Text description of the todo
  completed boolean // Status of the todo, true if completed
  created_at datetime [default: `now()`] // Timestamp of todo creation
  updated_at datetime // Timestamp of last update
}

// User schema
table: users {
  id int [pk, increment] // Primary key
  email string [unique] // User email, must be unique
  password_hash string // Hashed password for security
  created_at datetime [default: `now()`] // Timestamp of user account creation
  updated_at datetime // Timestamp of last update
}

// This schema can be adapted and expanded as necessary.

