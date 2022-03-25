---
sidebar_position: 9
---
# Đăng xuất khỏi tất cả thiết bị


Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/logout-all
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
