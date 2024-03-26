import { User } from './user';
import { Blog } from './blog';


interface User {
  userID: number;
}


interface Blog {
  blogID: number;
}


export interface Comment {
  commentID: number;    
  userID: number;       
  blogID: number;       
  content: string;
}


export interface CommentWithRefs extends Comment {
  user: User;
  blog: Blog;
}







