---
sidebar_position: 9
---

# Xoá một dự án

Method **`DELETE`**

```shell
https://hrmadmin.herokuapp.com/api/projects/<id>
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
}
```

