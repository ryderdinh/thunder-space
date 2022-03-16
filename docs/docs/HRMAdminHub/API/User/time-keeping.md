---
sidebar_position: 3
---
# Chấm công
Method **`PUT`**

```shell
https://hrmadmin.herokuapp.com/api/location
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích           |
| -------------- | ------ | ------------------- |
| `lat`     | string | vĩ độ   |
| `lon`     | string | kinh độ |

### Header

| Trường dữ liệu  | Kiểu   | Chú thích                                   |
| --------------- | ------ | ------------------------------------------- |
| `Authorization` | string | `Bearer` + [`accessToken`](../access-token.md) |

### Response
```json
    status: 200,
    data: "check in complete"
```

### Error
```json
    status: 400,
    error: "try after 5 minutes"
```
```json
    status: 400,
    error: "can not check in"
```
```json
    status: 400,
    error: "something went wrong"
```
