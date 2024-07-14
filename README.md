## Một số thuật ngữ trong MongDB

- Cấp độ cao nhất là Organizations
- 1 Organizations có thể có nhiều project
- 1 project có thể có nhiều cluster
- 1 cluster có thể có nhiều database
- Trong mỗi database chúng ta lại có các collection
- Mỗi collection lại có nhiều document

Cluster có thể hiểu là một server vps, dùng để cài đặt mongodb.Từ đó chúng ta
có thể tạo thêm nhiều database trên cái server đó

Collection tương đưỡng với bảng bên SQL
Document tượng đương hàng bên SQL

## MVC
- Controller: tiếp nhận xử lý request(xử lý logic)
- Model: xử lý database
- View: hiển thị cho người dùng


## Error handling
- Gọi `next()` để chuyển request sang request handler tiếp theo
- Gọi `next(err)` để chuyển sang error handller tiếp theo

Khi xảy ra lỗi trong synchronous handler thì phải gọi `next(err)` để chuyển sang
error handler

## Error handler

## Format lỗi trả về cho người dùng

Chúng ta nên thống nhất format lỗi trả về cho người dùng

Lỗi thường

```ts
{
    message: string
    error_info?: any
}
```

Lỗi validation (422)

```ts
{
    message: string,
    errors: {
        [field: string]: {
            msg: string
            [key: string]: any
        }
    }
}
```

## Chương: Xử lý media

1. folder `uploads` nên bỏ vào `.gitignore` vì đẩy lên git sẽ khá nặng
2. Để folder `uploads` trong máy tính local sẽ ko thể share file với mọi người => Giải pháp là upload lên 1 nền tảng như S3, hoặc upload lên server của chúng ta.
