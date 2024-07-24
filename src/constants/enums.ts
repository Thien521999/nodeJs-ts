export enum userVerifyStatus {
  Unverified, // chưa xác thực email, mặc định 0
  Verified, // đã xác thực email
  Banned // bị khoá
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum MediaType {
  Image, // 0
  Video // 1
}

export enum TweetType {
  Tweet, // 0
  Retweet, // 1
  Comment, //2
  QuoteTweet //3
}

export enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}
