-- PostgreSQL database schema for the application
CREATE TABLE users (
    UserID SERIAL PRIMARY KEY,
    UserName VARCHAR(255) UNIQUE NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(Email);
CREATE INDEX idx_users_username ON users(UserName);
