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

| Method / Path                        | Request (body, query)  | Response  |
| :---------------------------         | :--------------------  | :-------  |
| POST /comment/create/:noteId         | - { content }          | -         |
| DELETE /comment/delete/:commentId    | -                      | -         |
