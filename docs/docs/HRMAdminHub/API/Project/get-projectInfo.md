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
      "_id": "623b3f9036893d63a53240f3",
      "code": "p3",
      "name": "project",
      "member": [
        {
          "uid": "61e146ad37bfab063e6ab935",
          "role": "manager",
          "_id": "623b3f9036893d63a53240f4"
        }
      ],
      "issue": [],
      "createdAt": 1648050064773,
      "__v": 0
    },
    {
      "_id": "623b3fb136893d63a5324110",
      "code": "p2",
      "name": "project",
      "member": [
        {
          "uid": "61e146ad37bfab063e6ab935",
          "role": "manager",
          "_id": "623b3fb136893d63a5324111"
        },
        {
          "uid": "623b376bcf978427d09cd28c",
          "role": "normal",
          "_id": "623b3fb136893d63a5324112"
        }
      ],
      "issue": [],
      "createdAt": 1648050097426,
      "__v": 0
    }
  ]
}
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |
