---
sidebar_position: 9
---

# Thêm thành viên vào dự án

Method **`DELETE`**

```shell
https://hrmadmin.herokuapp.com/api/projects/<id>/members/add
```
### Tham số

| Trường dữ liệu | Kiểu   | Chú thích                        |
| -------------- | ------ | -------------------------------- |
| `managers`      | array  | các email mới của  quản lí trong dự án    |
| `members`       | array  | các email mới của thành viên trong dự án |

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
    "_id": "626e55ddea2d6e23c4976f86",
    "code": "PJT",
    "name": " pro jec t1",
    "description": "test",
    "member": [
      {
        "uid": "61e146ad37bfab063e6ab935",
        "role": "manager",
        "name": "Pham Huu Thang",
        "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
        "_id": "626e55ddea2d6e23c4976f87"
      },
      {
        "uid": "6263d371180c51ceaff86754",
        "role": "normal",
        "name": "Hoang Minh Nhat",
        "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
        "_id": "626e5ebd4d2bfc5b6752373d"
      },
      {
        "uid": "623b376bcf978427d09cd28c",
        "role": "manager",
        "name": "Dinh Quang Anh",
        "avatar": "https://res.cloudinary.com/dawqbbo2l/image/upload/v1626963206/avatar/avatar-none_byqbnn.svg",
        "_id": "626e60b5cb4fea87493d5374"
      }
    ],
    "createdAt": 1651398102081,
    "updateAt": 1651400885951,
    "issue": []
  }
}
```