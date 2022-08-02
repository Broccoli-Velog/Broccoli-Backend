# Env

`.env.prod` 과 `.env.dev` 를 두개를 다음의 항목을 채워서 넣어주세요.

```yaml
PORT = 서버 실행 포트

# database

DB_HOST = IPv4 경로
DB_ID = DB 계정 이름
DB_NAME = DB 이름
DB_PW = DB 비밀번호

# jsonwebtoken

JWT_SECRET = 암호화 토큰 값
JWT_ALGORITHM = 암호화 방식

# bcrpyt

BCRYPT_SALT = 암호화 횟수
```