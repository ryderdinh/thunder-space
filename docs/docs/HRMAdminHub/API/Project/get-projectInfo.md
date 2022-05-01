---
sidebar_position: 3
---

# Lấy thông tin 1 dự án

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/projects/<id>
```
### Response
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "_id": "626e55ddea2d6e23c4976f86",
    "code": "PJT",
    "name": " pro jec t1",
    "description": "test",
    "member": [
      {
        "uid": "61e146ad37bfab063e6ab935",
        "role": "manager",
        "name": "Pham Huu Thang",
        "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
        "_id": "626e55ddea2d6e23c4976f87"
      },
      {
        "uid": "623b376bcf978427d09cd28c",
        "role": "manager",
        "name": "Dinh Quang Anh",
        "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
        "_id": "626e60b5cb4fea87493d5374"
      }
    ],
    "createdAt": 1651398102081,
    "updateAt": 1651403573627,
    "issue": [
      {
        "iid": "626e66e4f6417aaf3896a942",
        "_id": "626e66e5f6417aaf3896a944"
      },
      {
        "iid": "626e6b35264ad93aa9ffcb9b",
        "_id": "626e6b35264ad93aa9ffcb9d"
      }
    ]
  }
}
```
### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |
