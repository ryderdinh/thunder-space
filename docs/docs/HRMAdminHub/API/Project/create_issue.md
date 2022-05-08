---
sidebar_position: 6
---

# Tạo vấn đề

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/projects/<pid>/issues/create
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `name`         | string | tên vấn đề                    |
| `type`         | string | loại vấn đề [task, bug]                        |
| `assigned`      | string | người được giao    |
| `estimate`      | number | thởi gian kết thúc |
| `priority`   |string | mức độ ưu tiên [low, medium, high, highest]|
| `description`|string| mô tả |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
{
  "status": 200,
  "message": "success",
  "data": {
    "name": "test",
    "code": "PJT-2",
    "type": "task",
    "creator": {
      "id": "61e146ad37bfab063e6ab935"
    },
    "assign": {
      "id": "623b376bcf978427d09cd28c"
    },
    "estimate": {
      "start": 123123,
      "end": 123123
    },
    "description": "",
    "priority": "low",
    "attachment": [],
    "status": [],
    "history": [],
    "createdAt": 1651403552081,
    "updateAt": 1651403573369,
    "_id": "626e6b35264ad93aa9ffcb9b",
    "__v": 0
  }
}
```

### Error


