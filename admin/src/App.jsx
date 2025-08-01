import "./App.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Add from "./pages/Add/Add"
import EditDesign from "./pages/Edit/Edit"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"
import ImageList from "./pages/ImageList/ImageList"
import Login from "./components/Login/Login"
import View from "./pages/ViewPage/View"
import CreateImg from "./pages/CreateImg/CreateImg"
import Jarvis from "./pages/Jarvis/Jarvis"
import Dashboard from "./pages/Dashboard/Dashboard"
import Users from "./pages/Users/Users.jsx"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import JarvisProvider from "./JarvisContext/JarvisProvider.jsx"

export const backendURL = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  const MainLayout = ({ children }) => (
    <>
      <Navbar setToken={setToken} />
      <div className="adminContainer">
        <Sidebar />
        <div className="container">
          {children}
        </div>
      </div>
    </>
  )

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <JarvisProvider>
          {
            token === "" ?
              <Login setToken={setToken} />
              :
              <div className="adminPage">
                <Routes>
                  <Route path="/jarvis" element={<Jarvis />} />
                  <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
                  <Route path="/add" element={<MainLayout><Add token={token} /></MainLayout>} />
                  <Route path="/list" element={<MainLayout><List token={token} /></MainLayout>} />
                  <Route path="/orders" element={<MainLayout><Orders token={token} /></MainLayout>} />
                  <Route path="/imageList" element={<MainLayout><ImageList token={token} /></MainLayout>} />
                  <Route path="/createImg" element={<MainLayout><CreateImg /></MainLayout>} />
                  <Route path="/view/:aiImgId" element={<MainLayout><View /></MainLayout>} />
                  <Route path="/edit/:aiImgId" element={<MainLayout><EditDesign /></MainLayout>} />
                  <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
                </Routes>
              </div>
          }
        </JarvisProvider>
      </BrowserRouter>
    </>
  )
}
