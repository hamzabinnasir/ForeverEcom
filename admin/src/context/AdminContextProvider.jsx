import React, { useEffect, useState } from "react"
import adminContext from "./adminContext"
import { toast } from "react-toastify"
import axios from "axios"
import { backendURL } from "../App.jsx"
export default function AmdinContextProvider({ children }) {
    const [allUsers, setAllUsers] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [imageList, setImgList] = useState([]);
    const currency = "$";
    let contextValue = {
        currency,
        backendURL,
        allUsers,
        allOrders,
        imageList
    }

    useEffect(() => {
        const getAllUsers = async (r) => {
            try {
                let response = await axios.get(`${backendURL}/api/user/all`);
                if (response.data.success) {
                    setAllUsers(response.data.allUsers);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        getAllUsers();
    }, [backendURL]);



    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/orders/all`);
                if (response.data.success) {
                    setAllOrders(response.data.allOrders);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        fetchAllOrders();
    }, [backendURL]);


    useEffect(() => {
        const getAllAiImages = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/allAiImgs`);
                if (response.data.success) {
                    setImgList(response.data.allAiImages);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };
        getAllAiImages();
    }, [backendURL]);

    return (
        <adminContext.Provider value={contextValue}>
            {children}
        </adminContext.Provider>
    )
}