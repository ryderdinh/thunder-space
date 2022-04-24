---
sidebar_position: 2
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
{
  "status": 200,
  "message": "success",
  "data": [
    [
      1647444451771,
      11399379
    ],
    [
      1647444813488,
      11399379
    ],
    [
      1648222304238,
      11502612
    ]
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