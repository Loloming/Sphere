import React, { useEffect, useState } from "react";
import axios from 'axios';
import SendAudio from "./Audio/SendAudio";
import { useSelector } from "react-redux";
import { getUserLogged } from "../../redux/reducers/userReducer";

const { VITE_CLOUD_NAME, VITE_POST_MEDIA_PRESET, VITE_PORT } = import.meta.env;

export default function Upload() {

    const [images, setImages] = useState();
    const [content, setContent] = useState('');
    const [audio, setAudio] = useState();

    const [files, setFiles] = useState([]);

    const userLogged = useSelector(getUserLogged);

    useEffect(() => {
        if (images && audio) {
            setFiles([...images, audio])
        }
        else if (images) {
            setFiles([...images])
        }
        else if (audio) {
            setFiles([audio])
        }
    }, [images, audio])

    const handleUpload = async (e) => {
        e.preventDefault();

        if (files[0]) {
            const uploadRequests = files.map(file => {
                const uploadData = new FormData();
                uploadData.append('file', file);
                uploadData.append('upload_preset', VITE_POST_MEDIA_PRESET);
                return axios.post(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`, uploadData);
            });
            try {
                const responses = await Promise.all(uploadRequests);
                axios.post(`http://localhost:${VITE_PORT}/posts/createPost`, {
                    content,
                    user_id: userLogged[0].id,
                    images: responses.filter(file => file.data.resource_type === 'image').map(f => {
                        return {url: f.data.public_id}
                    }) || null,
                    audio: responses.filter(file => file.data.resource_type === 'video').map(f => {
                        return f.data.public_id
                    })[0] || null
                })
            } catch (error) {
                console.log(error);
            }
          }
          else {
            try {
                const response = await axios.post(`http://localhost:${VITE_PORT}/posts/createPost`, {
                    content,
                    user_id: userLogged[0].id,
                })
                console.log(response)
            } catch (error) {
                console.log(error);
            }
          }
        }
      

    return (
        <form className="flex flex-col items-center bg-gradient-to-b from-sixty-percent to-sixty-percent-home shadow-2xl rounded-lg p-4 w-full my-5">
            <input type="text" className="rounded-lg w-5/6 text-center bg-slate-300 focus:outline-none h-16 animate-expand" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
            <input className="text-teal-50" type="file" name="file" onChange={(e) => setImages(e.target.files)}/>
            <SendAudio setAudio={setAudio} audio={audio}/>
            {audio && (
                <audio src={URL.createObjectURL(audio)} controls />
            )}
            <button className="text-teal-50" onClick={handleUpload}>Submit</button>
        </form>
    )
}