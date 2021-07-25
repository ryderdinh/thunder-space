---
sidebar_position: 5
---

# Tạo dự án

<<<<<<< HEAD

=======
>>>>>>> 3b314dade43ed5d147dcc509924408d5043a35d4
Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createProject/:id
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `code`         | string | mã code dự án                    |
| `name`         | string | tên dự án                        |
| `manager`      | array  | các email quản lí trong dự án    |
| `member`       | array  | các email thành viên trong dự án |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](access-token.md) |
