---
sidebar_position: 9
---
# Đăng xuất khỏi tất cả thiết bị


Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/logout-all
```
### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    status: 200,
    data: "success"
```

### Error
```json
    status: 401,
    error: "unauthorize"
```
```json
    status : 400,
    error : "something went wrong"
```
