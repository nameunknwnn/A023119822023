"use client"

import Image from "next/image";
import { useState } from "react";
import { loggerMiddleware } from "./middleware";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Home() {
  const [code, setcode] = useState("");
  const router = useRouter();
  const handleClick = async () => {
    if (!url || url === "") {
      alert("Please enter a URL.");
      return;
    }
    const response = await axios.post("/api/shorturl", {

      url,
      code
    });
    setShortUrl("https://" + response.data.data.shortUrl + ".in");
  };

  const handleCodeclick =async (url:string) =>{
    setcode(code)
  };
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const handlerouting=()=>{
    router.push(url)
  }
  return (
   <div className="space-y-10 w-[500px] mx-auto pt-10">
      <div  className="text-4xl pb-10">
        Short Url
      </div>
      <div>
      codename you want to give:
      <input placeholder="Enter your codename url if you want(optional )" 
        className="w-full p-2 rounded-md border border-gray-300" 
        onChange={(e)=>setcode(e.target.value)}/>
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
            handlerouting();
            
          }}>{shortUrl}</button>
      </div>
   </div>
  );
}
