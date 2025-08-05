"use client"

import Image from "next/image";
import { useState } from "react";
import { loggerMiddleware } from "./middleware";



export default function Home() {
  const [url, setUrl] = useState("");
  const logger = loggerMiddleware(req, res);

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
          logger.log(123);
        }}>Shorten</button>

      </div>
   </div>
  );
}
