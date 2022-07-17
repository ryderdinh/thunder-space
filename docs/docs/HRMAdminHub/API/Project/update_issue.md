---
sidebar_position: 7
---

# Chỉnh sửa vấn đề 

Method **`PUT`**

```shell
https://hrmadmin.herokuapp.com/issues/<iid>
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `name`         | string | tên vấn đề                    |
| `type`         | string | loại vấn đề [task, bug]                        |
| `assigned`      | string | người được giao    |
| `estimate`      | number | thởi gian kết thúc |
| `priority`   |string | mức độ ưu tiên [low, medium, high, highest]|
| `description`|string| mô tả |

### Response
```json
    
```