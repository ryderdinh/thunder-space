---
sidebar_position: 1
---

# Đăng nhập

## Lấy access token.

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/loginToken
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `username`     | string | email người dùng    |
| `password`     | string | mật khẩu người dùng |

## Lấy thông tin người dùng

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/loginUser
```

### Header
| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `Authorization`     | string | `Bearer` + `accessToken`   |
