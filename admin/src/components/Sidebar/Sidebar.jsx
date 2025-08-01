import "./sidebar.css"
import React from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ImageIcon from '@mui/icons-material/Image';
export default function Sidebar() {
    return (
        <>
            <div className="sideBarContainer">
                <ul className="sideBarListContainer">
                    <NavLink className={"link"} to={"/jarvis"}>
                        <li className="adminNavList jarvis-item">
                            <img src={assets.jarvis_icon} alt="Jarvis" className="jarvis-icon" />
                            <p>Jarvis</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/"}>
                        <li className="adminNavList">
                            <GridViewOutlinedIcon />
                            <p>Dashboard</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/users"}>
                        <li className="adminNavList">
                            <PeopleIcon />
                            <p>Users</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/orders"}>
                        <li className="adminNavList">
                            <ReceiptIcon />
                            <p>Orders</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/list"}>
                        <li className="adminNavList">
                            <ListAltIcon />
                            <p>List Items</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/add"}>
                        <li className="adminNavList">
                            <img src={assets.add_icon} alt="no img" />
                            <p>Add Items</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/createImg"}>
                        <li className="adminNavList">
                            <AddPhotoAlternateIcon />
                            <p>Create Image</p>
                        </li>
                    </NavLink>
                    <NavLink className={"link"} to={"/imageList"}>
                        <li className="adminNavList">
                            <ImageIcon />
                            <p>Image List</p>
                        </li>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}