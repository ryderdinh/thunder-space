---
sidebar_position: 1
---

# Tạo dự án

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/projects/create
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `code`         | string | mã code dự án                    |
| `name`         | string | tên dự án                        |
| `managers`      | array  | các email quản lí trong dự án (trừ người tạo)    |
| `members`       | array  | các email thành viên trong dự án |

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
    "message": "project code already exist"
 }
```
```json
   {
    "status": 400,
    "message": "something went wrong"
    }
```
```json
{
  "status": 400,
  "message": "wrong data form"
}
```
