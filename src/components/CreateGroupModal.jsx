import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaUsers, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateGroupModal = ({ isOpen, onClose, users }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupImage, setGroupImage] = useState('');
  

  const handleUserToggle = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async() => {
    if (!groupName) return alert('Group name is required');

   try {
     const payload={
       name: groupName,
       participants: selectedUsers,
       image: groupImage || undefined,
     }
     const res=await axios.post(`http://localhost:8080/api/group/create`,payload)
     if(res.data.success){
      toast.success(res.data.message)
    // Reset state
    setGroupName('');
    setSelectedUsers([]);
    setGroupImage('');
    onClose();
     }
   } catch (error) {
    toast.error(error)
   }
    
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaUsers /> Create Group
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-red-500">
              <FaTimes />
            </button>
          </div>

          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Group Image URL (optional)"
            value={groupImage}
            onChange={(e) => setGroupImage(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <div>
            <p className="font-semibold mb-2">Select Participants:</p>
            <div className="max-h-40 overflow-y-auto space-y-1">
  {users.map((user) => (
    <>
    <label key={user._id} className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={selectedUsers.includes(user._id)}
        onChange={() => handleUserToggle(user._id)}
      />
      <img
        src={user.image || 'https://i.pravatar.cc/40?u=' + user._id}
        alt={user.name}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span>{user.name}</span>
     
      
    </label>
    </>
  ))}
</div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Create Group
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateGroupModal;
