---
sidebar_position: 5
---

# Tìm kiếm người dùng

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/search-user?email=<userEmail>
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    status: 200,
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
     status: 404,
    error: "user not found"
```
```json
    status: 400,
    error: "something went wrong"
```