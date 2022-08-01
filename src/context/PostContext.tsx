import { createContext, ReactNode, useEffect, useState } from "react";
import { IPostContext } from "../interfaces/IPostContext";



export const PostContext = createContext({} as IPostContext);

interface PostContext {
  children: ReactNode;
}

const PostContextProvider = ({ children }: PostContext) => {
  const [loading, setLoading] = useState<boolean>(false);




  




  return (
    <PostContext.Provider value={{ loading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
