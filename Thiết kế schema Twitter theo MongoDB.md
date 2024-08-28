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

## Luồng tạo 1 tweet
Ở đây mình sẽ giả sử một trường hợp tạo tweet đầy đủ hashtag, mentions và media

Một body đầy đủ sẽ như thế này

```ts
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

### Validate Tweet body

Nếu mà validate pass 100% case của tweet thì tất tốn time, nên m sẽ validate những case chính. Tất nhiên nó sẽ dính 1 số case hiếm gặp, các bạn phát hiện thì tự bổ sung v nha.

- `type` phải là 1 trong 4 loai `TweetType`
- `audience` phải là 1 trong 2 loại `TweetAudience`
- Nếu `type` là retweet, comment, quotetweet thì `parent_id` phải là `tweet_id` của  tweet cha, nếu `type` là tweet thì `parent_id` thì phải là `null`
- Nếu `type` là retweet thì `content` phải là `''`. Nếu `type` là comment, quotetweet, tweet và ko có `mentions` và `hashtags` thì `content` phải là string và ko dc rỗng.
- `hashtags` phải là mảng các string
- `mentions` phải là mảng các string dạng id
- `medias` phải là mảng các `Media`

## bookmarks

Bookmarks các tweet lại, mỗi user ko giới hạn số lượng bookmark.Sỡ dĩ ko cần `updated_at` là vì trong trường hợp người dùng unbookmark thì chúng ta sẽ xoá document này đi

```ts
interface BookMarks {
  _id: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at: Date
}
```

## likes

Tương tự `bookmarks` thì chúng ta có collections `likes`

```ts
interface Like {
  _id: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at: Date
}
```
