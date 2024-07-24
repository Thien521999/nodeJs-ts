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


### Vấn đề của Access Token
- Như flow trên thì chúng ta không lưu access token ở trên server, mà lưu ở trên client. Điều này gọi là stateless, tức là server không lưu trữ trạng thái nào của người dùng nào cả.

- Khuyết điểm của nó là chúng ta không thể thu hồi access token được. Các bạn có thể xem một số ví dụ dưới đây.

- Ví dụ 1: Ở server, chúng ta muốn chủ động đăng xuất một người dùng thì không được, vì không có cách nào xóa access token ở thiết bị client được.

- Ví dụ 2: Client bị hack dẫn đến làm lộ access token, hacker lấy được access token và có thể truy cập vào tài nguyên được bảo vệ. Dù cho server biết điều đấy nhưng không thể từ chối access token bị hack đó được, vì chúng ta chỉ verify access token có đúng hay không chứ không có cơ chế kiểm tra access token có nằm trong danh sách blacklist hay không.

- Với ví dụ thứ 2, chúng ta có thể thiết lập thời gian hiệu lực của access token ngắn, ví dụ là 5 phút, thì nếu access token bị lộ thì hacker cũng có ít thời gian để xâm nhập vào tài nguyên của chúng ta hơn => giảm thiểu rủi ro.

- Nhưng mà cách này không hay lắm, vì nó sẽ làm cho người dùng bị logout và phải login sau mỗi 5 phút, rất khó chịu về trải nghiệm người dùng.

- Lúc này người ta mới nghĩ ra ra một cách để giảm thiểu những vấn đề trên, đó là sử dụng thêm Refresh Token.

### Refresh Token
- Refresh Token là một chuỗi token khác, được tạo ra cùng lúc với Access Token. Refresh Token có thời gian hiệu lực lâu hơn Access Token, ví dụ như 1 tuần, 1 tháng, 1 năm...

- Flow xác thực với access token và refresh token sẽ được cập nhật như sau:

1. Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Authorization. Client gửi username và password của họ cho server.
2. Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớp, server tạo ra 2 JWT khác nhau là Access Token và Refresh Token chứa payload là user_id (hoặc trường nào đó định danh người dùng). Access Token có thời gian ngắn (cỡ 5 phút). Refresh Token có thời gian dài hơn (cỡ 1 năm). Refresh Token sẽ được lưu vào cơ sở dữ liệu, còn Access Token thì không.
3. Server trả về access token và refresh token cho client.
4. Client lưu trữ access token và refresh token ở bộ nhớ thiết bị (cookie, local storage,...).
5. Đối với các yêu cầu tiếp theo, client gửi kèm access token trong header của request.
6. Server verify access token bằng secret key để kiểm tra access token có hợp lệ không.
7. Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu.
8. Khi access token hết hạn, client gửi refresh token lên server để lấy access token mới.
9. Server kiểm tra refresh token có hợp lệ không, có tồn tại trong cơ sở dữ liệu hay không. Nếu ok, server sẽ xóa refresh token cũ và tạo ra refresh token mới với expire date như cũ (ví dụ cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023) lưu vào cơ sở dữ liệu, tạo thêm access token mới.
10. Server trả về access token mới và refresh token mới cho client.
11. Client lưu trữ access token và refresh token mới ở bộ nhớ thiết bị (cookie, local storage,...).
12. Client có thể thực hiện các yêu cầu tiếp theo với access token mới (quá trình refresh token diễn ra ngầm nên client sẽ không bị logout).
13. Khi người dùng muốn đăng xuất thì gọi API logout, server sẽ xóa refresh token trong cơ sở dữ liệu, đồng thời client phải thực hiện xóa access token và refresh token ở bộ nhớ thiết bị.
14. Khi refresh token hết hạn (hoặc không hợp lệ) thì server sẽ từ chối yêu cầu của client, client lúc này sẽ xóa access token và refresh token ở bộ nhớ thiết bị và chuyển sang trạng thái bị logout.

### Vấn đề bất cập giữa lý thuyết và thực tế
Mong muốn của việc xác thực bằng JWT là stateless, nhưng ở trên các bạn để ý mình lưu refresh token vào cơ sở dữ liệu, điều này làm cho server phải lưu trữ trạng thái của người dùng, tức là không còn stateless nữa.

Chúng ta muốn bảo mật hơn thì chúng ta không thể cứng nhắc cứ stateless được, vậy nên kết hợp stateless và stateful lại với nhau có vẻ hợp lý hơn. Access Token thì stateless, còn Refresh Token thì stateful.

Đây là lý do mình nói có sự mâu thuẫn giữa lý thuyết và thực tế áp dụng, khó mà áp dụng hoàn toàn stateless cho JWT trong thực tế được.

Và có một lý do nữa tại sao mình lưu refresh token trong database đó là refresh token thì có thời gian tồn tại rất là lâu, nếu biết ai bị lô refresh token thì mình có thể xóa những cái refresh token của user đó trong database, điều này sẽ làm cho hệ thống an toàn hơn.

Tương tự nếu mình muốn logout một người dùng nào đó thì mình cũng có thể xóa refresh token của người đó trong database. Sau khoản thời gian access token họ hết hạn thì họ thực hiện refresh token sẽ không thành công và họ sẽ bị logout. Có điều là nó không tức thời, mà phải đợi đến khi access token hết hạn thì mới logout được.

Chúng ta cũng có thể cải thiện thêm bằng cách cho thời gian hết hạn access token ngắn lại và dùng websocket để thông báo cho client logout ngay lập tức.

### Tại sao lại tạo một refresh token mới khi chúng ta thực hiện refresh token?
Vì nếu refresh token bị lộ, hacker có thể sử dụng nó để lấy access token mới, điều này khá nguy hiểm. Vậy nên dù refresh token có thời gian tồn tại rất lâu, nhưng cứ sau vài phút khi access token hết hạn và thực hiện refresh token thì mình lại tạo một refresh token mới và xóa refresh token cũ.

Lưu ý là cái Refresh Token mới vẫn giữ nguyên ngày giờ hết hạn của Refresh Token cũ. Cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023.

Cái này gọi là refresh token rotation.

### Làm thế nào để revoke (thu hồi) một access token?
Các bạn có thể hiểu revoke ở đây nghĩa là thu hồi hoặc vô hiệu hóa

Như mình đã nói ở trên thì access token chúng ta thiết kế nó là stateless, nên không có cách nào revoke ngay lập tức đúng nghĩa được mà chúng ta phải chữa cháy thông qua websocket và revoke refresh token

Còn nếu bạn muốn revoke ngay thì bạn phải lưu access token vào trong database, khi muốn revoke thì xóa nó trong database là được, nhưng điều này sẽ làm access token không còn stateless nữa.

### Có khi nào có 2 JWT trùng nhau hay không?
Có! Nếu payload và secret key giống nhau thì 2 JWT sẽ giống nhau.

Các bạn để ý thì trong payload JWT sẽ có trường iat (issued at) là thời gian tạo ra JWT (đây là trường mặc định, trừ khi bạn disable nó). Và trường iat nó được tính bằng giây.

Vậy nên nếu chúng ta tạo ra 2 JWT trong cùng 1 giây thì lúc thì trường iat của 2 JWT này sẽ giống nhau, cộng với việc payload các bạn truyền vào giống nhau nữa thì sẽ cho ra 2 JWT giống nhau.

### Ở client thì nên lưu access token và refresh token ở đâu?
Nếu trình duyệt thì các bạn lưu ở cookie hay local storage đều được, mỗi cái đều có ưu nhược điểm riêng. Nhưng cookie sẽ có phần chiếm ưu thế hơn "1 tí xíu" về độ bảo mật.

Chi tiết so sánh giữa local storage và cookie thì mình sẽ có một bài viết sau nhé.

Còn nếu là mobile app thì các bạn lưu ở bộ nhớ của thiết bị.

### Gửi access token lên server như thế nào?
Sẽ có 2 trường hợp

- Lưu cookie: Nó sẽ tự động gửi mỗi khi request đến server, không cần quan tâm nó.
- Lưu local storage: Các bạn thêm vào header với key là Authorization và giá trị là Bearer <access_token>.

### Khi tôi logout, tôi chỉ cần xóa access token và refresh token ở bộ nhớ của client là được chứ?
Nếu bạn không gọi api logout mà đơn thuần chỉ xóa access token và refresh token ở bộ nhớ của client thì bạn vẫn sẽ logout được, nhưng sẽ không tốt cho hệ thống về mặt bảo mật. Vì refresh token vẫn còn tồn tại ở database, nếu hacker có thể lấy được refresh token của bạn thì họ vẫn có thể lấy được access token mới.


### Tối ưu khác

Ngoài việc index thì dưới đây là 1 số tips để các bạn có thể tối ưu hơn.

- Phân tích câu truy vấn với `explain`

- Dùng MongoDB Driver lúc nào cũng nhanh hơn dùng các ODM(ORM) như Mongoose, Prisma
vì nó bỏ qua lớp ảo hoá và truy vấn trực tiếp vào database.

- Để server MongoDB gần với Server của bạn nhất có thể.
