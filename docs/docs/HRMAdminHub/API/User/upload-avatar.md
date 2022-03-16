---
sidebar_position: 4
---

# Thay ảnh đại diện

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/upload/avatar/<userId>
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
    status : 200, 
    data : "success"
```
### Error
```json
    status: 401,
    error :"unauthorize"
```
```json
    status : 400,
    error :"something went wrong"
```