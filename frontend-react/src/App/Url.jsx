import { useEffect, useState } from "react";
import { createApi, deleteApi, getAllApi } from "../Api/serverApi";
import Input from "./Input";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Url() {

    const [api, setApi] = useState([]);
    const [state, setState] = useState(false);
    const [bool, setBool] = useState(false);
    const [allurl, setAllurl] = useState([]);

    const handleUrl = async (text) => {
        const payload = {
            longUrl: text,
        }
        const data = await createApi(payload);
        setApi(data);
    }

    console.log(api.data);
    const getUrl = async () => {
        const data = await getAllApi();
        setAllurl(data);
    }
    useEffect(() => {
        getUrl();
    }, [])
    return (
        <div>
            <Input addUrl={handleUrl} />
            <div style={{ marginTop: "30px" }}>
                {
                    api.data ? <div style={{ display: "flex", gap: "1rem" }}>
                        <input value={api.data.shortUrl} style={{ width: "400px", fontSize: "20px", fontWeight: "bold", padding: "10px 20px", borderRadius: "20px" }} />
                        <CopyToClipboard text={api.data.shortUrl}
                            onCopy={() => setState(true)}>
                            <button style={{ fontSize: "20px", fontWeight: "bold", padding: "10px 20px", borderRadius: "20px", background: "blue", color: "white" }}>Copy Shorten URL</button>
                        </CopyToClipboard>
                        {
                            state ? <span style={{ color: "red" }}>Copied!</span> : ""
                        }
                    </div> : ""
                }
            </div>

            <div style={{ marginTop: "30px" }} >
                <button onClick={() => setBool(!bool)} style={{ fontSize: "20px", fontWeight: "bold", padding: "10px 20px", borderRadius: "20px", background: "black", color: "white" }}>Get All Shorten URL</button>
            </div>
            {
                bool ? <div style={{ marginTop: "30px" }}>
                        {
                            allurl?.data.map((item) => {
                                return <div key={item._id} style={{border: "2px solid black", padding: "10px", margin: "10px", fontWeight: "bold"}}>
                                    <div>ID: {item._id}</div>
                                    <div>UrlCode: {item.urlCode}</div>
                                    <div>LongUrl: {item.longUrl}</div>
                                    <div>Short: {item.shortUrl}</div>
                                    <div>Date: {item.date}</div>
                                    <div>
                                        <button onClick={()=>deleteApi(item._id)} style={{background: "red", color: "white"}}>Delete Url</button>
                                    </div>
                                </div>
                            })
                        }
                </div> : ""
            }
        </div>
    )
}