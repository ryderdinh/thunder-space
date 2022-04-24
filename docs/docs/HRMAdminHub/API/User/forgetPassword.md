---
sidebar_position: 3
---

# Quên mật khẩu

Method **`POST`**
```shell
https://hrmadmin.herokuapp.com/api/forget-password
```
### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `email`     | string | email của người dùng   |

### Response
```json
{
    "status" : 200,
    "message" : "success"
}
```

### Error
```json
{
    "status" : 400,
    "message": "your email does not exist"
}
```
```json
{
  "status": 400,
  "message": "something went wrong"
}
```
