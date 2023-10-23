import axios from "axios"

export const fetchuser=async()=>{
         const res=await axios.get(`https://jsonplaceholder.typicode.com/posts`);
         console.log("user",res);
         return res;
}
