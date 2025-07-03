import React from 'react'

function Signup() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Create Account
    </h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Create a password"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Profile Image URL
        </label>
        <input
          type="url"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Register
      </button>
    </form>
  </div>
</div>

    
    </>
  )
}

export default Signup