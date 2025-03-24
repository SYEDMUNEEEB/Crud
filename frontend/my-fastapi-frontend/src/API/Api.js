import axios from "axios"
const API_URL="http://127.0.0.1:8000 "

export const getBooks=async()=>{
    const response=await axios.get(`{API_URL}/books`);
    return response.data
};

export const getBookById=async(id)=>{
    const response= await axios.get(`{API_URL}/books/{id}`)
    return response.data
};

export const createBook=async(bookData)=>{
    const response=axios.post(`{API_URL}/create`,bookData)
    return response.data;

}

export const updateBook=async (id,bookData)=>{
    const response=axios.put(`{API_URL}/books/{id}`,bookData);
    return response.data;
};

export const deleteBook=async(id)=>{
    const response=await axios.delete(`{API_URL}/del/id`);
    return response.data
}