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
    status: 200,
    data: "success"
```
### Error
```json
    status: 400,
    error: "new password is same your current password"
```
```json
    status: 400,
    error: "new password is invalid"
```
```json
    status: 400,
    error: "something went wrong"
```
