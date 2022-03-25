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
   {
  "status": 200,
  "message": "success",
  "data": {
    "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
    "_id": "61e146ad37bfab063e6ab935",
    "email": "boypham1234567@gmail.com",
    "name": "Pham Huu Thang",
    "birthday": "26/07/2021",
    "position": "Account Representative III",
    "department": "Legal",
    "phonenumber": "0949275629",
    "createdAt": "1970-01-20T00:09:13.645Z",
    "updatedAt": "1970-01-20T01:50:21.880Z",
    "__v": 4
  }
}
```
### Error
```json
{
  "status": 401,
  "message": "unauthorize"
}
```
```json
{
  "status": 400,
  "message": "something went wrong"
}
```
