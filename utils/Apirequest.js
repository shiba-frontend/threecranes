import axios from "axios";
import { getToken } from '@/utils/getToken';

const storedToken = getToken();

const _URL = "https://threecranes.itiffyconsultants.com/api/"

let headers= { 
    'Content-Type': 'application/json', 
    'Key':'13ae7b7d7ba75ac286656a7a274905ca',
    'Authorization': storedToken,
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


export const RemoveCoupon = async () =>{
    try{

        let response = await axios.get(`${_URL}remove-coupon`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}
export const GetCheckout = async () =>{
    try{

        let response = await axios.get(`${_URL}checkout`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const GetOrderList = async () =>{
    try{

        let response = await axios.get(`${_URL}order-list`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const GetProfile = async () =>{
    try{

        let response = await axios.get(`${_URL}get-profile`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const UpdateProfile = async (body) =>{
    try{

        let response = await axios.post(`${_URL}update-profile`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const ChangePassword = async (body) =>{
    try{

        let response = await axios.post(`${_URL}change-password`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const GetAddress = async () =>{
    try{

        let response = await axios.get(`${_URL}get-address`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const AddAddress = async (body) =>{
    try{

        let response = await axios.post(`${_URL}add-address`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const DeleteAddress = async (body) =>{
    try{

        let response = await axios.post(`${_URL}delete-address`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}

export const GetReviews = async () =>{
    try{

        let response = await axios.get(`${_URL}get-reviews`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const GetWishlist = async () =>{
    try{

        let response = await axios.get(`${_URL}get-wishlist`, {headers})
   
        return response?.data

    } catch(error){ return error?.response?.data}
}

export const DeleteWishlist = async (body) =>{
    try{

        let response = await axios.post(`${_URL}delete-wishlist`, body, {headers})

        return response?.data

    } catch(error){return error?.response?.data}
}
