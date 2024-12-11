import axios from "axios";
import { getToken } from '@/utils/getToken';

const storedToken = getToken();

const _URL = "https://threecranes.itiffyconsultants.com/api/"

let headers= { 
    'Content-Type': 'application/json', 
    'Key':'13ae7b7d7ba75ac286656a7a274905ca',
    'Authorization': 'Bearer '+storedToken,
    'source': 'ANDROID',
}

export const GetHome = async () =>{
    try{

        let response = await axios.get(`${_URL}get-home`, {headers})

        return response?.data

    } catch(error){}
}


export const GetParentCategory = async () =>{
    try{

        let response = await axios.get(`${_URL}get-parent-category`, {headers})

        return response?.data

    } catch(error){}
}

export const GetParentCategoryWiseProduct = async (body) =>{
    try{

        let response = await axios.post(`${_URL}get-product-list-by-parent-category`, body, {headers})

        return response?.data

    } catch(error){}
}

export const GetProductDetails = async (body) =>{
    try{

        let response = await axios.post(`${_URL}product-details`, body, {headers})

        return response?.data

    } catch(error){}
}

export const GetCart = async () =>{
    try{

        let response = await axios.get(`${_URL}get-cart`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const AddCart = async (body) =>{
    try{

        let response = await axios.post(`${_URL}add-cart`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const RemoveCart = async (body) =>{
    try{

        let response = await axios.post(`${_URL}cart-item-remove`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const UpdateCart = async (body) =>{
    try{

        let response = await axios.post(`${_URL}update-cart-item`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}


export const FilterProduct = async (body) =>{
    try{

        let response = await axios.post(`${_URL}product-filter`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const ApplyCoupon = async (body) =>{
    try{

        let response = await axios.post(`${_URL}apply-coupon`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}