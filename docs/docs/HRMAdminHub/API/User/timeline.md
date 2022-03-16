---
sidebar_position: 8
---

# Mốc chấm công 
Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/timeline
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    status : 200,
    data : [
        [

        ]
    ]
```

### Error
```json
     status: 400,
    error: "something went wrong"
```