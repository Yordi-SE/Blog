import { User } from './user';
import { Blog } from './blog';

interface User {
  userID: number;
}

interface Blog {
  blogID: number;
}

export interface Like {
  likeID: number;    
  userID: number;    
  blogID: number;    
}



export interface LikeWithRefs extends Like {
  user: User;
  blog: Blog;
}






