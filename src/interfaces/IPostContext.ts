interface Likes {
  _id: string;
}

interface CommentsPostedBy {
  _id: string;
  username: string;
  pic: string;
}

export interface Comments {
  _id: string;
  text: string;
  postedBy: CommentsPostedBy;
}

interface PostedBy {
  _id: string;
  username: string;
  pic: string;
}

export interface Post {
  _id: string;
  caption: string;
  photo: string;
  likes: Likes[];
  comments: Comments[];
  postedBy: PostedBy;
  createdAt: string;
  updatedAt: string;
  liked:boolean;
  _v: number;
}

export interface IPostContext {
  loading: boolean;
}




