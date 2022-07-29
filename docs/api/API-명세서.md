# API 명세서

## User

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| GET /         | -                     | -        |

## Note

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| POST /note    | { title, context, series? } | - |
| GET /note     | `?`key=value`&`key=value | - |
| GET /note/:noteId |  | - |

## Comment

| Method / Path                | Request (body, query)  | Response  |
| :--------------------------- | :--------------------  | :-------  |
| POST /create/:noteId         | - { content }          | -         |
| DELETE /delete/:commentId    | -                      | -         |
