### tweets

Chúng ta sẽ chọnn ra những tính năng chính của tweet để clone

1. Tweet có thể chứa text, hashtags, mentions, ảnh, video
2. Tweet có thể hiển thị cho everyone hoặc Twitter Circle
3. Tweet có thể quy định người reply (everyone, người mà chúng ta follow, người chúng ta mention)

- Tweet sẽ có nested tweet, nghĩa là tweet có thể chứa tweet con bên trong. Nếu dùng theo kiểu nested object sẽ ko phù hợp, vì sớm thôi, nó sẽ chạm đến giới hạn. Chưa kể query thông tin 1 tweet con rất khó.

Vậy nên ta sẽ lưu trường `parent_id` để biết tweet này là con của ai. Nếu `parent_id` là `null` thì đó là tweet gốc.

- Nếu là tweet bình thường thì sẽ có `content` là string. Còn nếu là retweet thì sẽ ko có `content` mà chỉ có `parent_id` thôi, lúc này có thể cho content là `''` hoặc `null`, như mình phân tích ở những bài trc thì mình thích để `''` hơn, đỡ phải phân tích trường hợp `null` . vậy nên `content` có thể là `string`.

> nếu là '' thì sẽ chiếm bộ nhớ hơn là null , nhưng điều này là ko đúng đáng kể so với lợi ích nó đem lại

- `audience` đại diện cho tính riêng tư của tweet ,Ví dụ tweet có thể là public cho mọi người xem hoặc chỉ cho nhóm người nhất định. Vậy nên `visibility` có thể là `TweetAudience` enum.

- `type` đại diện cho loại tweet. Ví dụ tweet, retweet, quote tweet.

- `hashtag` là mảng chứa ObjectId của các hashtag. Vì mỗi tweet có thể có nhiều hashtag. Vậy
nên `hashtag` có thể là `ObjectId[]`.

- `mentions` là mảng chứa ObjectId của các user được mention. Vì mỗi tweet có thể có nhiều user được mention. Vậy nên `mentions` có thể là  `ObjectId[]`.

- `medias` là mảng chứa ObjectId của các media. Vì mỗi tweet chỉ có thể có 1 và media. Nếu upload ảnh thì sẽ ko upload dc video và ngược lại. Vậy nên `medias` có thể là `Media[]`.

- Bên twitter sẽ có rất nhiều chỉ số để phân tích lượt tiếp cận của 1 tweet. Trong giới hạn cuả khoá học thì chúng ta chỉ phân tích lượt view thôi.

Lượt view thì chúng ta chia làm 2 loại là `guest_views` là số lượng lượt xem của tweet từ người dùng ko đăng nhập và `user_views` là dành cho đã đăng nhập . 2 trường này mình sẽ cho kiểu dữ liệu là `number`.


```ts
interface Tweet {
  _id: ObjectId
  user_id: ObjectId
  type: TweetType
  audience: TweetAudience // doi tuong khan gia
  content: string
  parent_id: null | ObjectId // chỉ null khi tweet gốc
  hashtags: ObjectId[]
  mentions: ObjectId[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at: Date
  updated_at: Date
}
```

```ts
interface Media {
  url: string
  type: MediaType // video, image
}
enum MediaType {
  Image, // 0
  Video // 1
}
enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}
enum TweetType {
  Tweet, // 0
  Retweet, // 1
  Comment, //2
  QuoteTweet //3
}
```

```ts
// mot body day du gui len api
interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience // doi tuong khan gia
  content: string
  parent_id: null | string // chỉ null khi tweet gốc, ko thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtasg dạng ['java', 'nextjs']
  mentions: string[] // user_id[]
  medias: Media[]
}
```