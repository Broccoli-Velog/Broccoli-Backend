# API 명세서

## User

| Method / Path         | Request (body, query) | Response |
| :-------------------- | :-------------------- | :------- |
| POST /auth/register   | { email, nickname, password } | 하단 참고 |
| POST /auth/login      | { email, password } | 하단 참고 |

### post /auth/register

```json
// 201 Created, 회원가입에 성공
{
    "isSuccess": true,
    "message": "회원가입에 성공하였습니다.",
    "result": {
        "email": "입력한 이메일",
        "nickname": "입력한 닉네임"
    }
}

// 400 Bad Request, 타입 및 범위가 잘못된 경우 - 회원가입에 실패
{
    "isSuccess": false,
    "message": "실패한 내용에 대한 문자열이 영문으로 적혀집니다.",
    "result": {}
}

// 403 Conflict, 중복된 유저 - 회원가입에 실패
{
    "isSuccess": false,
    "message": "이메일 및 닉네임이 중복된 사용자가 존재합니다.",
    "result": {
        "email": "입력한 이메일",
        "nickname": "입력한 닉네임"
    }
}
```

### post /auth/login

```json
// 201 Created, 로그인에 성공
{
    "isSuccess": true,
    "message": "로그인에 성공하셨습니다.",
    "result": {
        "email": "입력한 이메일",
        "nickname": "이메일에 일치하는 사용자의 닉네임"
    },
    "token": "JWT 토큰"
}

// 400 Bad Request, 비밀번호가 틀린 경우 - 로그인 실패
{
    "isSuccess": true,
    "message": "비밀번호가 일치하지 않습니다.",
    "result": {
        "email": "입력한 이메일"
    }
}

// 400 Bad Request, 타입 및 범위가 잘못된 경우 - 로그인 실패
{
    "isSuccess": false,
    "message": "실패한 내용에 대한 문자열이 영문으로 적혀집니다.",
    "result": {}
}

// 404 Not Found, 존재하지 않는 유저 - 로그인 실패
{
    "isSuccess": false,
    "message": "존해하지 않는 사용자입니다.",
    "result": {
        "email": "입력한 이메일"
    }
}
```

## Note

| Method / Path | Request (body, query) | Response |
| :------------ | :-------------------- | :------- |
| POST /note    | { title, context, series? } | - |
| GET /note     | `?`key=value`&`key=value | - |
| GET /note/:noteId |  | - |

## Comment

| Method / Path                        | Request (body, query)  | Response  |
| :---------------------------         | :--------------------  | :-------  |
| POST /comment/create/:noteId         | - { content }          | -         |
| DELETE /comment/delete/:commentId    | -                      | -         |
