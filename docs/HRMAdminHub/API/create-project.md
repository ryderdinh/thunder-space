---
sidebar_position: 4
---

# Tạo dự án

## Lấy access token.

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createProject/:id
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `code`     | string | code dự án    |
| `name`     | string | tên dự án |
| `manager`     | array | mảng email quản lí |
| `member`     | array | mảng email thành viên |

### Header

Tìm hiểu về cách lấy [`Access token`](sign-in.md)