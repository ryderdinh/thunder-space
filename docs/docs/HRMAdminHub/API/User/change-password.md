---
sidebar_position: 6
---

# Đổi mật khẩu

Method **`PUT`**

```shell
https://hrmadmin.herokuapp.com/api/change-password
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `newPassword`     | string | mật khẩu mới    |
| `currentPassword`     | string | mật khẩu hiện thời |

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
  "message": "new password is same your current password"
}
```
```json
 {
  "status": 400,
  "message": "new password is invalid"
}
```
```json
  {
  "status": 400,
  "message": "something went wrong"
}
```
