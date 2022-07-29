## 모델

Ctrl + Shift + V 를 누르시면 미리보기가 가능합니다.

### user

```javascript
{
    "user_id": { type: Number, Auto_Icrement, PK },                             // AI 는 1부터 자동으로 수 증가, PK 는 기본키
    "email": { type: String, pattern: RegExp, unique: true, required: true },   // 이메일의 형태가 온전해야하고, 최대 40자
    "nickname": { type: String, pattern: RegExp, unique: true, required: true }, // 단모음, 단자음을 제외한 영문, 한글 최대 10자
    "password": { type: String, required: true }                                 // 영어, 숫자, 특수문자(선택) 포함한 8자 이상 30자 이하 (DB 기준으로는 암호화때문에 255 자로...)
    "createdAt": { type: Datetime },
    "updatedAt": { type: Datetime },
}
```

### note

```javascript
{
    "note_id": { type: Number, PK }
    "fk_user_id": { type: String, FK, required: true },                             // user테이블의 user_id 항목과 같아집니다.
    
    "title": { type: String, min: 1, max: 50, required: true, unique: true, PK },   // 
    "content": { type: String, min: 1, max: 255, required: true },                  //
    "image": { type: String, min: 1, max: 200 },                                    //
    "series": { type: String, min: 1, max: 20, defualt: null },
    
    "createdAt": { type: Date, default: today, required: true },
    "updatedAt": { type: Date, default: today, required: true }
}
```

### comment

```javascript
{
    "comment_id": { type: Number, Auto_Icrement, PK },
    "content": { type: String, min: 1, max: 100},
    "createdAt": { type: Datetime },
    "updatedAt": { type: Datetime },
    "fk_note_id": { type: Number, FK },
    "fk_user_id": { type: Number, FK }
}
```