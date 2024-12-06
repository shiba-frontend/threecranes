import axios  from "axios";
import React, { useState, useEffect } from "react";
import { getToken } from '@/utils/getToken';

const storedToken = getToken();

console.log("localstorage", storedToken)
const URL = "https://threecranes.itiffyconsultants.com/api/"

export default axios.create({
    baseURL:URL,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+storedToken,
        'Key':'13ae7b7d7ba75ac286656a7a274905ca',
        'source': 'WEB',
    },
   
})