---
sidebar_position: 6
---

# Tìm kiếm người dùng


Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/searchUser
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `email`     | string | email người dùng    |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](access-token.md) |