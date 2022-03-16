---
sidebar_position: 7
---

# Lấy thông tin sự kiện

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/event
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |


### Response
```json
    status : 200,
    data : {
        [
            eid: "",
            name: "",
            date: "",
            event_detail: "" 
        ]
    }
```
### Error
```json
    status: 400,
    error: "something went wrong"
```

