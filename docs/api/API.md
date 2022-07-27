## 명세서

| 경로 | 설명 | 요청 | 반환값 |
| :-- | :---- | :---- | :----- |
| POST /register | 회원가입 | { email, username, password } | 반환값의 기본 폼을 준수해서 미정 |
| POST /login | 로그인 | { email, password } | " |
| GET /note | 전체 게시글 보기 | `?`key=value`&`key=value | " |
| POST /note | 게시글 작성 | { title, context, series? } | " |
| GET /note/:title | 게시글 보기 | { } | " |

> 서버 단에서 일관된 `Form`을 쓰는 이유
> - 성공/실패
>     - 회원가입 OK : 성공 201 Created
>    - 회원가입 NO
>        - 중복 사용자가 있다면 : 실패 409 Conflict
>        - 값의 범위가 적용이 안될 떄 : 실패 400 Bad Rquest
>        - 알 수 없는 이유 : 실패 500 Interveral Serveral Error

### 반환값의 기본 폼

```javascript
return res.status(201).json({
    isSuccess: true,
    message: '성공 시, 프론트가 출력하길 원하는 메세지' || '실패, 고유한 에러 메세지', 
    result: {
        user: {},
        jwt: {}
    }
})
```

## 이론

### RESTful 의 조건

- 경로에 쓰이는건 대상의 이름(감자, 고구마)
    -  동사 안됨
    -  복수 안됨
    -  대문자 안됨
    -  스페이스바 안됨 + 언더 바 안됨, `-(하이픈)` 만 가능
    -  제한 적인 상황에서 동사를 사용하기도 해요.
- 메서드 이릉은 대상으로 할 행동
- 단수와 복수의 구분은
    - 명사가 써져있으면 그건 복수
    - 단수 구분은 뒤에 /대상의-이름/구분할-수-있는-변수-값
        - 예) notes/: