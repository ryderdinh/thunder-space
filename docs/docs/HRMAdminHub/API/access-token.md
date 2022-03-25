---
sidebar_position: 1

---

# Access token

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/token
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `email`     | string | email người dùng    |
| `password`     | string | mật khẩu người dùng |

### Response
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxNDZhZDM3YmZhYjA2M2U2YWI5MzUiLCJpYXQiOjE2NDgyMjE2MzUsImV4cCI6MTY0ODIyNTIzNX0.4O0xrlA_RHdA4H29tzYH-FGwEpb9XZMNy2gG3q7bqz0"
  }
}
```
### Error
```json
{
  "status": 400,
  "message": "wrong email or password"
}
```