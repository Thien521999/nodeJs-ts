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

## Chương: Tối ưu hiệu xuất MongoDB
### ĐN:
Trong MongoDB , index là một cấu trúc dự liệu giúp tăng tốc độ truy vấn và sắp xếp của các câu lệnh trong cơ sở dữ liệu. Nó hoạt động tương tự như bookmark của quyển sách, cần đi đến trang nào thì chỉ cần mở trang đó lên mà ko vần phải tìm kiếm từ đầu.

### Ưu nhược điểm của index:
Ưu điểm lớn nhất là tăng tốc độ truy vấn, từ đó giảm thiểu thời gian trả kết quả.

### Nhược điểm của index
-Tốn dung lượng lưu trữ: Index tạo ra các bảng chỉ mục riêng biệt, từ đó làm tăng dung lượng bộ nhớ.

- Tốn thời gian khi thêm, sửa, xoá dữ liệu: khi bạn thêm, sửa hoặc xoá dữ liệu trong các trường đã tạo index, MongoDB sẽ phải cập nhật lại chỉ mục liên quan. Quá trình này tiêu tốn thời gian và tài nguyên hơn so với việc ko sử dụng index.


### Giới hạn của index

- Một collection chỉ có thể có tối đa 64 index.
- Một collection chỉ có 1 index text.

### Một số loại index phổ biến

- Single Field Index: Index trên một đường duy nhất.
- Compound Index: Index trên nhiều trường
- Search Index: Index trên một trường có kiểu dữ liệu là string, dùng để tìm kiếm.
