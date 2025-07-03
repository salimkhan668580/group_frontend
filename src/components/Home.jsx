import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const [userList,setUserList]=useState([])
    const userLogin= useSelector((state)=>state.userLogin.value)

    useEffect(()=>{ 
        getUserList()
    },[])

const  getUserList=async()=>{

    try {
        
        const res= await axios.get(`http://localhost:8080/api/message/get-user`)
        if(res.data.success){
            
            setUserList(res.data.data)
        }
        
        
    } catch (error) {
        console.log(error)
        
    }

    }
   
    if(!userLogin) return <Login/>
    
    
  return (
    <>
    <div className="h-screen w-full flex">
  {/* Left Sidebar - User List (30%) */}
<div className="w-[30%] rounded bg-white border-r border-gray-300 overflow-y-auto">
  {/* Header with User Title + Avatar */}
  <div className="p-4 border-b flex items-center justify-between">
    <h2 className="text-lg font-semibold">Users</h2>

    {/* Avatar with dropdown */}
    <div className="relative group cursor-pointer">
      <img
        src="https://i.pravatar.cc/150?img=5"
        alt="Me"
        className="w-10 h-10 rounded-full border"
      />

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg hidden group-hover:block z-50">
        <ul className="py-2 text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">👤 Profile</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">⚙️ Settings</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🚪 Logout</li>
        </ul>
      </div>
    </div>
  </div>

  {/* Users List */}
  <ul>
    {userList.map((item)=>(

    <li key={item._id} className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b">
      <img
        src={item.image}
        alt="User 1"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-gray-800">{item.name}</h4>
          <span className="text-xs text-gray-500">2:45 PM</span>
        </div>
        <p className="text-sm text-gray-600 truncate">lastmsg</p>
      </div>
    </li>
    ))}

 
  </ul>
</div>


<div className="w-[70%] flex rounded flex-col bg-gray-100">
  {/* Chat Header */}
  <div className="p-4 bg-white border-b font-semibold">Chat with User 1</div>

  {/* Chat Messages with background pattern */}
  <div
    className="flex-1 p-4 space-y-3 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] bg-repeat"
  >
    <div className="bg-white p-3 rounded-lg shadow max-w-md">
      Hi there!
    </div>
    <div className="bg-blue-500 text-white p-3 rounded-lg shadow self-end max-w-md ml-auto">
      Hello!
    </div>
    {/* Add more messages */}
  </div>

  {/* Chat Input */}
  <div className="p-4 bg-white border-t">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Send
      </button>
    </div>
  </div>
</div>

    


</div>

    </>
  )
}

export default Home