import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoginData} from "./store/userLoginSlice"
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from "react-spinners";

function Login() {
    const nevigate=useNavigate()
    const dispatch=useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [loginData,setLoginformData]=useState({
        email:"",
        password:""
    })
    const [oading,setLoading]=useState(false)

    const changeHandler=(e)=>{
        setLoginformData({
            ...loginData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        

        try {
            
             e.preventDefault()
            setLoading(true)
           const res= await axios.post("http://localhost:8080/api/auth/login",loginData)
           if(res.data.success){

               dispatch(setLoginData(res.data.data))
               toast.success(res.data.message)
               nevigate("/")
           }

      
        } catch (error) {
            console.log(error)
        
            if(error.response)
                toast.error(error.response.data.error)
           
            
        
            
        }finally{
            setLoading(false)
            
        }
       

    }
    
  return (
   <>
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Login to Your Account
    </h2>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
        name='email'
        onChange={changeHandler}
        value={loginData.email}
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

   <div className="relative">
  <label className="block mb-1 text-sm font-medium text-gray-700">
    Password
  </label>
  <input
    type={showPassword ? "text" : "password"}
    value={loginData.password}
    onChange={changeHandler}
    name="password"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
    placeholder="Enter your password"
  />

  {/* Eye Icon */}
  <span
    className="absolute right-3 top-9 text-gray-600 cursor-pointer"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>


      <button
        type="submit"
        className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {
   !loginData?
         <ClipLoader
       
        loading={loginData}
        color='white'
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      :
      "Login"
        }


      </button>
      

    </form>
  </div>
</div>


   </>
  )
}

export default Login