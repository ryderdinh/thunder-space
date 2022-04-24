---
sidebar_position: 2
---

# Lấy thông tin dự án

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/projects
```
### Response
```json
{
  "status": 200,
  "message": "success",
  "data": [
    {
      "_id": "6263c315d01e243942aeef76",
      "code": "p1",
      "name": "project",
      "member": [
        {
          "uid": "61e146ad37bfab063e6ab935",
          "role": "manager",
          "name": "Pham Huu Thang",
          "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
          "_id": "6263c315d01e243942aeef77"
        },
        {
          "uid": "623b376bcf978427d09cd28c",
          "role": "normal",
          "name": "Dinh Quang Anh",
          "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
          "_id": "6263c315d01e243942aeef78"
        }
      ],
      "issue": [],
      "createdAt": 1650705173164,
      "__v": 0
    }
  ]
}
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |
