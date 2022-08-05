USE sys;
DROP DATABASE IF EXISTS broccoli;
CREATE DATABASE IF NOT EXISTS broccoli;
USE broccoli;

CREATE TABLE user (
    user_id     SERIAL          NOT NULL    PRIMARY KEY,
    email       VARCHAR(40)     NOT NULL,
    nickname    VARCHAR(10)     NOT NULL,
    password    VARCHAR(255)    NOT NULL,
    created_at   DATETIME       NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME       NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE note (
    note_id     SERIAL          NOT NULL    PRIMARY KEY,
    fk_user_id  INTEGER         NOT NULL    REFERENCES user(user_id),
    title       VARCHAR(50)     NOT NULL,
    content     VARCHAR(255)    NOT NULL,
    image       VARCHAR(200),
    series      VARCHAR(20),
    created_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP

    -- 기본키 걸기
    -- PIMARY KEY note_id

    -- 외래키 걸기
    -- FOREIGN KEY fk_user_id REFERENCES ON use (user_id)
);

CREATE TABLE comment (
    comment_id  SERIAL          NOT NULL    PRIMARY KEY,
    content     VARCHAR(100)    NOT NULL,
    fk_note_id  INTEGER         NOT NULL    REFERENCES note(note_id),
    fk_user_id  INTEGER         NOT NULL    REFERENCES user(user_id),
    created_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP
);
