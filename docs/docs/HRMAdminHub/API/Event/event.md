---
sidebar_position: 1
---

# Lấy thông tin sự kiện

Method **`GET`**

```shell
https://hrmadmin.herokuapp.com/api/events
```

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |


### Response
```json
    {
  "status": 200,
  "message": "success",
  "data":
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
{
  "status": 400,
  "message": "something went wrong",
}
```

