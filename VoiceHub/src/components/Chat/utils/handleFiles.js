import axios from "axios";

const { VITE_CLOUD_NAME, VITE_POST_MEDIA_PRESET } = import.meta.env;

export const handleFiles = async ({ files }) => {
    const newFiles = Array.from(files);
    console.log(newFiles)
    if (newFiles.length > 1) {
        const uploadRequests = newFiles.map(file => {
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('upload_preset', VITE_POST_MEDIA_PRESET);
            return axios.post(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`, uploadData);
        });
        try {
            const responses = await Promise.all(uploadRequests);
            return responses;
        } catch (error) {
            console.log(error);
        }
      }
      else {
        try {
            const uploadData = new FormData();
            uploadData.append('file', files[0]);
            uploadData.append('upload_preset', VITE_POST_MEDIA_PRESET);
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/upload`, uploadData);
            return response;
        } catch (error) {
            console.log(error);
        }
      }
    }