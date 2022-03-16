---
sidebar_position: 1
---

# Đăng nhập

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/login
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    status : 200,
    data: {
    email: "", 
    name: "",
    birthday: "",
    position: "",
    department: "",
    phonenumber: "",
    avatar: {
        public_id: "" ,
        url: ""
    }}
```
### Error
```json
    status: 401,
    error: "unauthorized"
```
```json
    status: 400,
    error: "something went wrong"
```
