"use client"

import Image from "next/image";
import { useState } from "react";
import { loggerMiddleware } from "./middleware";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  const handleClick =async (url:string) =>{
    const response= await axios.post("/api/shorturl",{url})
    console.log("ansdakdsnad",response)
    setShortUrl("https://"+response.data.data.shortUrl+".in")
  };
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const handlerouting=()=>{
    router.push(url)
  }
  return (
   <div>
      <div  className="text-4xl pb-10">
        Short Url
      </div>

      <div>
        <input placeholder="Enter your url" 
        className="w-full p-2 rounded-md border border-gray-300" 
        onChange={(e)=>setUrl(e.target.value)}/>

        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={()=>{
          handleClick(url)
        }}>Shorten</button>

      </div>
      <div className="text-4xl pb-10">
          shortUrl:
          <button className="text-blue-500" onClick={()=>{
            handlerouting()
          }}>{shortUrl}</button>
      </div>
   </div>
  );
}
