---
sidebar_position: 10
---

# Đăng xuất khỏi thiết bị hiện thời

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/logout
```
### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
{
  "status": 200,
  "message": "success"
}
```

### Error

```json
{
  "status": 400,
  "message": "something went wrong"
}
```