[API 명세서 원본 보기](./API-%EB%AA%85%EC%84%B8%EC%84%9C.md)

| Method / Path         | Request (body, query) | Response | INFO       |
| :-------------------- | :-------------------- | :------- | :--------  |
| GET   /auth           | -                     | 하단 참고 | 내 정보보기 |
| PATCH /auth           | { nickname }          | 하단 참고 | 내 닉네임 수정 |
| DELETE /auth          | { password }          | 하단 참고 | 내 계정 탈퇴 |
| POST /auth/register   | { email, nickname, password } | 하단 참고 | 회원가입 |
| POST /auth/login      | { email, password } | 하단 참고 | 로그인 |

### GET /auth

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.

```json
// 201 Created, 내 프로필 열기에 성공
{
    "isSuccess": true,
    "message": "DB에서-긁어온-닉네임 님의 프로필 불러오기에 성공했씁니다.",
    "result": {
        "queryResult": {
            "userId": JWT-페이로드.userId,
            "email": "DB에서-긁어온-이메일",
            "nickname": "DB에서-긁어온-닉네임"
        }
    }
}

// 404 Not Found, 존재하지 않는 유저 - 불러오기 실패
{
    "isSuccess": false,
    "message": "존해하지 않는 사용자입니다.",
    "result": {
		"queryResult": {
            "email": "입력한 이메일"
        }
    }
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

### PATCH /auth

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.

```json
// 200 OK, 수정 성공
{
	"isSuccess": true,
	"message": "닉네임이 변경할-이름 으로 변경되었습니다.",
	"result": {
		"queryResult": {
			"userId": JWT-페이로드.userId,
			"nickname": "변경한-이름"
		}
	}
}

// 404 Not Found, 존재하지 않는 유저 - 불러오기 실패
{
    "isSuccess": false,
    "message": "존재하지 않는 사용자입니다.",
    "result": {
		"queryResult": {
            "email": "입력한-이메일"
		}
    }
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

### DELETE /auth

> tokenGuard 에 의해서 JWT 내의 userId 값이 req.body 안에 담긴 상태입니다.

```json
// 201 OK, 회원 탈퇴 성공
{
	"isSuccess": true,
	"message": "DB에서-긁어온-이름 님은 탈퇴되었습니다.",
	"result": {
		"queryResult": {
			"userId": JWT-페이로드.userId,
			"nickname": "DB-에서-긁어온-이름"
		}
	}
}

// 400 Bad Request, 비밀번호가 틀린 경우 - 탈퇴 실패
{
    "isSuccess": true,
    "message": "비밀번호가 일치하지 않습니다.",
    "result": {
        "queryResult": {
            "email": "입력한 이메일"
        }
    }
}

// 404 Not Found, 존재하지 않는 유저 - 로그인 실패
{
    "isSuccess": false,
    "message": "존해하지 않는 사용자입니다.",
    "result": {
        "queryResult": {
            "email": "입력한 이메일"
        }
    }
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

### POST /auth/register

```json
// 201 Created, 회원가입에 성공
{
    "isSuccess": true,
    "message": "회원가입에 성공하였습니다.",
    "result": {
        "queryResult": {
            "email": "입력한 이메일",
            "nickname": "입력한 닉네임"
        }
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
        "queryResult": {
            "email": "입력한 이메일",
            "nickname": "입력한 닉네임"
        }
    }
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

### POST /auth/login

```json
// 201 Created, 로그인에 성공
{
    "isSuccess": true,
    "message": "로그인에 성공하셨습니다.",
    "result": {
        "queryResult": {
            "email": "입력한 이메일",
            "nickname": "이메일에 일치하는 사용자의 닉네임"
        }
    },
    "token": "JWT 토큰"
}

// 400 Bad Request, 비밀번호가 틀린 경우 - 로그인 실패
{
    "isSuccess": true,
    "message": "비밀번호가 일치하지 않습니다.",
    "result": {
        "queryResult": {
            "email": "입력한 이메일"
        }
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
        "queryResult": {
            "email": "입력한 이메일"
        }
    }
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