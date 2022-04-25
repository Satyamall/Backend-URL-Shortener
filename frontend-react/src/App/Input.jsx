import { useState } from "react"

export default function Input({addUrl}){

    const [url, setUrl]= useState("");
    return(
        <div style={{ display: "flex", gap: "1rem"}}>
            <div>
                <input type="text" placeholder="Enter your Url" value={url} onChange={(e)=>setUrl(e.target.value)} style={{ width: "400px", fontSize: "20px", fontWeight: "bold", padding: "10px 20px", borderRadius: "20px"}}/>
            </div>
            <div>
                <button onClick={()=>addUrl(url)} style={{ fontSize: "20px", fontWeight: "bold", padding: "10px 20px", borderRadius: "20px", background: "black", color: "white"}}>Get Shorten URL</button>
            </div>
        </div>
    )
}