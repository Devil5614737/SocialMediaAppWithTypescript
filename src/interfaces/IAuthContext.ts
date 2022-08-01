interface Friends{
  _id:string
}

export interface User{
_id:string;
email:string;
friends:Friends[]
password:string;
pic:string;
username:string;
__v:number
}

interface UserI{
token:string,
user:User
}


export interface IAuthContext {
  auth: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  user:UserI,
  users:User[],
  searchUsers:(query:string)=>void;
  searchResults:User[],
  addFriend:(userId:string)=>void,
  removeFriend?:(userId:string)=>void
}
