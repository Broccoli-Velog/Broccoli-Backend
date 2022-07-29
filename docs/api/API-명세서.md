# API 명세서

## User

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| GET /         | -                     | -        |

## Note

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| GET /         | -                     | -        |

## Comment

| Method / Path                | Request (body, query)  | Response  |
| :--------------------------- | :--------------------  | :-------  |
| POST /create/:noteId         | - { content }          | -         |
| DELETE /delete/:commentId    | -                      | -         |
