---
sidebar_position: 8
---

# Thay ảnh đại diện

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/upload/avatar
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích         |
| -------------- | ------ | ----------------- |
| `image`        | binary | image file avatar |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    { 
        status : 200, 
        message : "success"
    }
```
### Error
```json
    { 
        status : 400, 
        message : "something went wrong"
    }
```