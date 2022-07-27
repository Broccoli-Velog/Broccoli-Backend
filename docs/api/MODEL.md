## 모델

### user

```javascript
{
    "email": { type: String, pattern: RegExp, unique: true, required: true }, // 이메일의 형태가 온전해야하고, 최대 50자
    "username": { type: String, pattern: RegExp, unique: true, required: true, PK}, // 단모음, 단자음을 제외한 영문, 한글 최대 10자
    "password": { type: String, required: true } // 영어, 숫자, 특수문자(선택) 포함한 8자 이상 30자  이하
}
```

### note

```javascript
{
    "author": { type: String, FK },
    "title": { type: String, min: 1, max: 50, required: true, unique: true, PK }, // 
    "context": { type: String, min: 1, max: 300, required: true }, //
    "series": { type: String, min: 1, max: 20 },
    
    "createdAt": { type: Date, default: today, required: true },
    "updatedAt": { type: Date, default: today, required: true }
}
```