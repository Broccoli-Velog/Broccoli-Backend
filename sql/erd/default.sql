USE sys;
DROP DATABASE IF EXISTS broccoli;
CREATE DATABASE IF NOT EXISTS broccoli;
USE broccoli;

DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS note;
DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user (
    user_id     SERIAL          NOT NULL    PRIMARY KEY,
    email       VARCHAR(40)     NOT NULL,
    nickname    VARCHAR(10)     NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    created_at   DATETIME       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME       NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS note (
    note_id     SERIAL          NOT NULL    PRIMARY KEY,
    fk_user_id  INTEGER         NOT NULL,
    title       VARCHAR(50)     NOT NULL,
    content     VARCHAR(255)    NOT NULL,
    image       VARCHAR(200),
    series      VARCHAR(20),
    created_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    -- 기본키 걸기
    -- PIMARY KEY note_id

    -- 외래키 걸기
    FOREIGN KEY (fk_user_id) REFERENCES user (user_id)
    
);

CREATE TABLE IF NOT EXISTS comment (
    comment_id  SERIAL          NOT NULL    PRIMARY KEY,
    content     VARCHAR(100)    NOT NULL,
    fk_note_id  INTEGER         NOT NULL,
    fk_user_id  INTEGER         NOT NULL,
    created_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (fk_note_id) REFERENCES note (note_id),
    FOREIGN KEY (fk_user_id) REFERENCES user (user_id)
);
