import axios from 'axios';


export default class API {
    // to get all post from the serve
    static async getUser(){
        const url = "admin/data";
        const res = await axios.get(url);
        return res.data;
    }
    // to get single by id
    static async getUserByID(id){
        const url = "admin";
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to insert into database
    static async addUser(post){
        const url = "admin/register";
        const res = await axios.post(url, post);
        return res.data;
    }
    static async User(post){
        const url = "admin/login";
        const res = await axios.post(url, post);
        return res.data;
    }
     // to update into database
     static async updateUser(id, post){
         const url = "admin/update"
        const res = await axios.put(`${url}/${id}`, post);
        return res.data;
    }
     // to delete into database
     static async deleteUser(id){
        const url = "admin";
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}