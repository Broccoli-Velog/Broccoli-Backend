[API 명세서 원본 보기](./API-%EB%AA%85%EC%84%B8%EC%84%9C.md)


### POST /comment

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.

- 201, Created : `게시글 작성에 성공하셨습니다.`
- 404, Not Found : `존재하지 않는 사용자입니다.`

- 400, Bad Request : `err.name : error.message` / 서버 내부 에러

```json
// 201, Created
{
    "isSuccess": true,
    "message": "게시글 작성에 성공하셨습니다.",
    "result": {
        "queryResult": {
            "userId": "토큰의 페이로드 내부에 있는 값",
            "commentId": "생성된 댓글의 commentId",
            "noteId": "입력한 게시글Id",
            "content": "입력한 댓글 내용"
        }
    }
}

// 404, Not Found
// JWT 소유주가 DB 안에 존재하지 않습니다.
// 이미 탈퇴하였지만, 만료되지 않은 토큰이 사용된 것 같습니다.
{
    "isSuccess": false,
    "message": "존재하지 않는 사용자입니다.",
    "result": {}
}

// 400, Bad Request
// 백앤드 내부에 발생한 에러일 확률이 높습니다.
{
    "isSuccess": false,
    "message": "에러제목 : 에러메세지",
    "result": {}
}
```


### PUT /comment/:commentId

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.


- 200, OK : `댓글이 수정되었습니다.`
- 404, Not Found
    - `존재하지 않는 사용자입니다.`
    - `존재하지 않는 댓글입니다.`
- 401, Unauthorized : `해당 댓글의 수정 권한이 없는 사용자입니다.`

- 400, Bad Request : `err.name : error.message` / 서버 내부 에러

```json
// 200, OK
{
    "isSuccess": true,
    "message": "댓글이 수정되었습니다.",
    "result": {
        "queryResult": {
            "userId": "토큰의 페이로드 내부에 있는 값",
            "commentId": "수정하려는 댓글의 commentId 으로, /comment/:commentId 형태",
            "content": "입력한 댓글 내용"
        }
    }
}


// 404, Not Found
// JWT 소유주가 DB 안에 존재하지 않습니다.
// 이미 탈퇴하였지만, 만료되지 않은 토큰이 사용된 것 같습니다.
{
    "isSuccess": false,
    "message": "존재하지 않는 사용자입니다.",
    "result": {}
}

// 401, Unathorization
// JWT 소유주와 댓글의 소유주가 일치하지 않습니다.
// 404, Not Found
// JWT 소유주가 DB 안에 존재하지 않습니다.
// 이미 탈퇴하였지만, 만료되지 않은 토큰이 사용된 것 같습니다.
{
    "isSuccess": false,
    "message": "해당 댓글의 수정 권한이 없는 사용자입니다.",
    "result": {}
}

// 404, Not Found
// commentId 와 일치하는 댓글이 존재하지 않았습니다.
// 아마 동시간대에 삭제 처리가 종료된 댓글이 아닐까요?
{
    "isSuccess": false,
    "message": "존재하지 않는 댓글입니다.",
    "result": {}
}


// 400, Bad Request
// 백앤드 내부에 발생한 에러일 확률이 높습니다.
{
    "isSuccess": false,
    "message": "에러제목 : 에러메세지",
    "result": {}
}
```


### DELETE /comment/:commentId

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.

- 200, Created : `댓글 삭제가 완료되었습니다.`
- 404, Not Found
    - `존재하지 않는 사용자입니다.`
    - `존재하지 않는 댓글입니다.`
- 401, Unauthorized : `해당 댓글의 삭제 권한이 없는 사용자입니다.`

- 400, Bad Request : `err.name : error.message` / 서버 내부 에러

```json
// 200, OK
{
    "isSuccess": true,
    "message": "댓글 삭제가 완료되었습니다.",
    "result": {}
}

// 404, Not Found
// JWT 소유주가 DB 안에 존재하지 않습니다.
// 이미 탈퇴하였지만, 만료되지 않은 토큰이 사용된 것 같습니다.
{
    "isSuccess": false,
    "message": "존재하지 않는 사용자입니다.",
    "result": {}
}

// 401, Unathorization
// JWT 소유주와 댓글의 소유주가 일치하지 않습니다.
// 404, Not Found
// JWT 소유주가 DB 안에 존재하지 않습니다.
// 이미 탈퇴하였지만, 만료되지 않은 토큰이 사용된 것 같습니다.
{
    "isSuccess": false,
    "message": "해당 댓글 수정 권한이 없는 사용자입니다.",
    "result": {}
}

// 404, Not Found
// commentId 와 일치하는 댓글이 존재하지 않았습니다.
// 아마 동시간대에 삭제 처리가 종료된 댓글이 아닐까요?
{
    "isSuccess": false,
    "message": "존재하지 않는 댓글입니다.",
    "result": {}
}

// 400, Bad Request
// 500, Unkown ServerError
// 백앤드 내부에 발생한 에러일 확률이 높습니다.
{
    "isSuccess": false,
    "message": "에러제목 : 에러메세지",
    "result": {}
}
```