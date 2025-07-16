import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import socketContext from './context/socketConfig'
import { useContext } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react';
import CreateGroupModal from './CreateGroupModal'


function Home() {
    const [userList,setUserList]=useState([])
    const userLogin= useSelector((state)=>state.userLogin.value)
    const [singleUserData,setSingleUserData]=useState({})
    const [selectedUser,setSelectedUser]=useState({})
    const [messageList,setMessageList]=useState([])
    const [typeMessage,setTypeMessage]=useState("")
    const [modalOpen,setModalOpen]=useState(false)
  const socket = useContext(socketContext);
  const messagesEndRef = useRef(null);
  const allUsers=[
  { _id: 'user1', name: 'John Doe' },
  { _id: 'user2', name: 'Alice Smith' },
  { _id: 'user3', name: 'Bob Lee' }
]

  async function getMessage(userID){
    

    const message=await axios.get(`http://localhost:8080/api/message/messages?receiver=${userID}&sender=${userLogin.user._id}`)
          setMessageList(message.data.data)
  }

   async function handleUserClick(user){
      try {
        
        const res=await axios.get(`http://localhost:8080/api/message/getUserDetails?id=${user._id}`)
        if(res?.data.success){
            // console.log(res.data.data)
            setSingleUserData(res.data.data)
            roomJoinHandler(user)
        }
        await getMessage(res.data.data._id)
      } catch (error) {
        toast.error(error)
        console.log(error)
        
      }
      
    }

    // const roomJoinHandler=async(user)=>{
    //     try {
    //       const payload= {
    //         room: `${userLogin.user._id}-${user._id}`
    //       }
    //       socket.emit("join_room",payload);

           
    //     } catch (error) {
    //         toast.error(error)
    //     }
    // }

    const roomJoinHandler = useCallback(async (user) => {
    try {
        const payload = {
            room: `${userLogin.user._id}-${user._id}`
        };
        socket.emit("join_room", payload);
    } catch (error) {
        toast.error(error);
    }
}, [socket, userLogin.user._id]);
 const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  
 useEffect(() => {
   socket.connect();
    const handleConnect = () => {
      console.log("✅ socket is connected");
    };

    if (socket) {
 
      socket.on("connect", handleConnect);
      console.log("🧪 socket.connected:", socket.connected);

      socket.on("notification", (data) => {
        console.log("notification", data);
        toast(data)
      })
       
      socket.on("rcv_msg", async(data) => {

        console.log("rcv_msg", data);
         setMessageList((prev) => [...prev,data]);

     
       
      })

    }else {
      console.log("socket is not defined");
    }

    return () => {
      if (socket) {
        socket.off("connect", handleConnect);
        //  socket.off("notification", handleNotification);
      }
    };
  }, [socket]);
  useEffect(() => {
    const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
};
scrollToBottom();
}, [messageList]);


    useEffect(()=>{ 
        getUserList()
    },[])

const  getUserList=async()=>{

    try {
        
        const res= await axios.get(`http://localhost:8080/api/message/get-user`,{
            withCredentials: true})
        if(res.data.success){
            
            setUserList(res.data.data)
        }
        
        
    } catch (error) {
        console.log(error)
        
    }

    }

    const sendMessageHandler=async()=>{

      try {
          // socket.connect();
         if(socket){
        socket.emit("send_msg",{
          msg:typeMessage,
          senderId:userLogin.user._id,
          receiverId:singleUserData._id
        })
    //     const data=  {
    //       lastmsg: typeMessage,
    //       messages: [
    //           {
    //               senderId,
    //               receiverId,
    //               msg,
                 
    //           }
    //       ]
    //  }
    //     setMessageList((prev)=>[...prev,data])

         setTypeMessage("")
      }else{
        console.log("socket is not defined")
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
    <span className='rotate-90 cursor-pointer'  onClick={toggleDropdown}>. . .</span>
    {open && (
   <div className="absolute left-0 top-12  mt-2 w-40 bg-white rounded-lg shadow-lg  z-50">
        <ul className="py-2 text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setModalOpen(true)}>👥 Create Group</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">👤 Profile</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">⚙️ Settings</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🚪 Logout</li>
        </ul>
      </div>
        )}
    {/* <h2 className="text-lg font-semibold">{userLogin.user.name}</h2> */}

    {/* Avatar with dropdown */}
    <div className="relative group cursor-pointer">
      <img
        src={userLogin.user.image}
        alt="Me"
        className="w-10 h-10 rounded-full border"
      />



    </div>
  </div>

  {/* Users List */}
  <ul>
    {userList.map((item)=>(
      item._id!==userLogin.user._id&&

    <li key={item._id} onClick={()=>handleUserClick(item)} className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b">
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



{/* ===================Right side chat================== */}

{
  Object.keys(singleUserData).length>0?
<div className="w-[70%] flex rounded flex-col bg-gray-100">
  {/* Chat Header */}
  <div className="p-4 bg-white border-b font-semibold flex items-center gap-3">
    <img
      src={singleUserData.image || "https://via.placeholder.com/40"}
      alt="Profile"
      className="w-10 h-10 rounded-full object-cover"
    />
    <span>{singleUserData.name}</span>
  </div>

  {/* Chat Messages with background pattern */}
  {/* <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] bg-repeat"> */}
<div className="flex-1 p-4 flex flex-col space-y-3 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] bg-repeat">


  {messageList.length>0? messageList?.map((item)=>

    item.messages?.map((message,idx)=>(


    <div key={idx} className={` p-3 rounded-lg shadow max-w-md ${message.senderId===userLogin.user._id? "self-end bg-blue-500":"self-start bg-white"}`}>
     {message.msg}
    </div>


    ))
  )
  :
  <div className='flex justify-center items-center h-[400px]'>No converation found</div>
}
  <div ref={messagesEndRef}></div>


    {/* Add more messages */}
  </div>

  {/* Chat Input */}
  <div className="p-4 bg-white border-t">
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type a message"
        value={typeMessage}
        onChange={(e) => setTypeMessage(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    

      <button onClick={sendMessageHandler} className="bg-blue-600 coursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Send
      </button>
   
    </div>
  </div>
</div>
:
<div className="w-[70%] flex rounded flex-col bg-gray-100">
  {/* Chat Header */}
  <div className="p-4 bg-white border-b font-semibold flex items-center gap-3">
   
    <span>Select user</span>
  </div>

<div className="flex-1 p-4 flex flex-col space-y-3 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')] bg-repeat">


  
  
  <div className='flex justify-center items-center h-[400px]'>No converation found</div>




  </div>

  

</div>
}


    


</div>


<CreateGroupModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  users={userList}
/>
    </>
  )
}

export default Home