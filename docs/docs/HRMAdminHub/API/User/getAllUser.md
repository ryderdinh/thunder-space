---
sidebar_position: 6
---
# Lấy tất cả người dùng để tạo dự án

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/users/to-create-project
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
  "data": [
    {
      "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
      "_id": "61e146ad37bfab063e6ab935",
      "email": "boypham1234567@gmail.com",
      "name": "Pham Huu Thang"
    },
    {
      "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
      "_id": "623b376bcf978427d09cd28c",
      "email": "occho@ngul.com",
      "name": "Dinh Quang Anh"
    },
    {
      "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
      "_id": "6263d371180c51ceaff86754",
      "email": "hoangnhat03032001@gmail.com",
      "name": "Hoang Minh Nhat"
    }
  ]
}
```

### Error

```json
{
  "status": 400,
  "message": "something went wrong"
}
```