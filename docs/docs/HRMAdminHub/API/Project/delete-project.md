---
sidebar_position: 7
---

# Xoá một dự án

Method **`DELETE`**

```shell
https://hrmadmin.herokuapp.com/api/projects/<id>
```
### Response
```json
{
  "status": 200,
  "message": "success",
}
```
### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |
