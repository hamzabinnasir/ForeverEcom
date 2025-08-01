import "./users.css"
import React, { useState, useEffect } from "react"
import { assets } from "../../assets/assets.js"
import { toast } from "react-toastify"
import axios from "axios"
import { backendURL } from "../../App.jsx"

export default function Users() {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                let response = await axios.get(`${backendURL}/api/user/all`);
                if (response.data.success) {
                    setAllUsers(response.data.allUsers);
                } else {
                    toast.error(error.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        getAllUsers();
    }, [backendURL]);

    const handleDeleteUser = async (userId) => {
        try {
            let response = await axios.post(`${backendURL}/api/user/delete`, {userId});
            if (response.data.success) {
                toast.success(response.data.message);
                setAllUsers(response.data.allUsers);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="users-container">
            <h2>All Users List</h2>

            <div className="users-table">
                <div className="table-header">
                    <div className="header-cell">Username</div>
                    <div className="header-cell">Email</div>
                    <div className="header-cell">Password</div>
                    <div className="header-cell">Cart Items</div>
                    <div className="header-cell">Actions</div>
                </div>

                <div className="table-body">
                    {allUsers?.map((user, index) => (
                        <div key={index} className="table-row">
                            <div className="table-cell" data-label="Username">
                                {user?.username || '-'}
                            </div>
                            <div className="table-cell" data-label="Email">
                                {user?.email || '-'}
                            </div>
                            <div className="table-cell" data-label="Password">
                                {user?.password ? '••••••••' : '-'}
                            </div>
                            <div className="table-cell" data-label="Cart Items">
                                {
                                    user?.cartData?.length > 0?
                                    <p>{user?.cartData?.length}</p>
                                    :
                                    <p>No Items</p>
                                }
                            </div>
                            <div className="table-cell actions" data-label="Actions">
                                <button
                                    onClick={() => handleDeleteUser(user?._id)}
                                    className="delete-btn"
                                    aria-label="Delete user"
                                >
                                    <img src={assets.cross_icon} alt="Delete" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}