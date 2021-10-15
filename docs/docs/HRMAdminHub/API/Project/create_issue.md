---
sidebar_position: 3
---

# Tạo tác vụ

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createIssue/:<userId>/:<projectId>
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `name`         | string | tên tác vụ                    |
| `type`         | string | loại tác vụ [task, bug]                        |
| `assign`      | string | người được giao    |
| `priority`   |string | mức độ ưu tiên [low, medium, high, highest]|
| `description`|string| mô tả |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](access-token.md) |
