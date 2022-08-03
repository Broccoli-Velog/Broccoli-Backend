# API 명세서

## User

| Method / Path         | Request (body, query) | Response |
| :-------------------- | :-------------------- | :------- |
| POST /auth/register   | { email, nickname, password } | 하단 참고 |
| POST /auth/login      | { email, password } | 하단 참고 |

[API auth 명세서 자세히 보기](./API-auth-%EB%AA%85%EC%84%B8%EC%84%9C.md)

## Note

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| POST /note    | { title, context, series? } | - |
| GET /note     | `?`key=value`&`key=value | - |
| GET /note/:noteId |  | - |

## Comment

> comment 는 req.headers.authorization 에 `Bearer 토큰` 의 형태가 항상 제공되어야 합니다.
> 요청을 보낼 때, 해당 헤더에 `Baerer ` + `JWT 토큰 값` 의 형태의 문자열을 추가해주세요.
>
> 토큰의 `누락` 및 `유효하지 않은(타 발행자) 등` 의 경우에는 []() 처럼 반환값이 전달됩니다.

[API comment 명세서 자세히 보기](./API-comment-%EB%AA%85%EC%84%B8%EC%84%9C.md)

| Method / Path            | Request (body, query)  | Response  |
| :----------------------- | :--------------------  | :-------  |
| POST /comment            | { noteId, content }    | -         |
| PUT  /comment/:commentId | { commentId, content } |           |
| DEL  /comment/:commentId | { commentId }          |           | 