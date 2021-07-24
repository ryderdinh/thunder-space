---
sidebar_position: 5
---

# Tạo dự án

Method **`POST`**

```shell
https://hrmadmin.herokuapp.com/api/createProject/:id
```

### Tham số

| Trường dữ liệu | Kiểu   | Chú thích             |
| -------------- | ------ | --------------------- |
| `code`         | string | code dự án            |
| `name`         | string | tên dự án             |
| `manager`      | array  | mảng email quản lí    |
| `member`       | array  | mảng email thành viên |
