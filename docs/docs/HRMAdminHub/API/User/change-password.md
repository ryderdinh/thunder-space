---
sidebar_position: 6
---

# Đổi mật khẩu

Method **`PUT`**

```shell
https://hrmadmin.herokuapp.com/api/change-password/<userId>
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
