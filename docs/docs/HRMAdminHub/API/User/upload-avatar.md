---
sidebar_position: 3
---

# Thay ảnh đại diện

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/upload/avatar/:id
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích         |
| -------------- | ------ | ----------------- |
| `image`        | binary | image file avatar |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](access-token.md) |
