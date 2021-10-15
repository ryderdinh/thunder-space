---
sidebar_position: 3
---

# Tạo vấn đề

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createIssue/<userId>/<projectId>
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `name`         | string | tên vấn đề                    |
| `type`         | string | loại vấn đề [task, bug]                        |
| `assign`      | string | người được giao    |
| `priority`   |string | mức độ ưu tiên [low, medium, high, highest]|
| `description`|string| mô tả |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |
