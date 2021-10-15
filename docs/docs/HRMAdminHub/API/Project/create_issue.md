---
sidebar_position: 3
---

# Tạo tác vụ

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createIssue/:[User id]/:<Project's id>
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `projectCode`         | string | mã code dự án                    |
| `projectName`         | string | tên dự án                        |
| `projectManager`      | array  | các email quản lí trong dự án    |
| `projectMember`       | array  | các email thành viên trong dự án |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](access-token.md) |
