---
sidebar_position: 7
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
{
  "status": 200,
  "message": "success",
  "data": {
    "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
    "_id": "623b376bcf978427d09cd28c",
    "email": "occho@ngul.com",
    "name": "Dinh Quang Anh",
    "birthday": "14/07/2021",
    "position": "Developer IV",
    "department": "Business Development",
    "phonenumber": "0000000000",
    "createdAt": "1970-01-20T01:47:27.979Z",
    "updatedAt": "1970-01-20T01:47:27.979Z",
    "__v": 0
  }
}
```

### Error

```json
 {
  "status": 404,
  "message": "user not found"
}
```
```json
{
  "status": 400,
  "message": "something went wrong"
}
```