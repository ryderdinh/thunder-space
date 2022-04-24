---
sidebar_position: 4
---

# Tạo lại mật khẩu 

Method **`POST`**
```shell
https://hrmadmin.herokuapp.com/api/reset-password
```
### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `email`     | string | email của người dùng   |
| `otp`     | string |  Mã OTP được gửi về email  |
| `password`     | string | Mật khẩu mới   |
| `confirmPassword`     | string | Xác nhận mật khẩu mới   |

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
  "status": 400,
  "message": "OTP is not validate"
}
```
```json
{
  "status": 400,
  "message": "password not match"
}
```

```json
{
  "status": 400,
  "message": "something went wrong"
}
```