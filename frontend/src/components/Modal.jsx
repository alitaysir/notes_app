// Modal.jsx
import React, { useEffect, useState } from 'react';

const Modal = ({ closeModal, addNote, currentNote, editNote  }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    if(currentNote){
      setTitle(currentNote.title)
      setDescription(currentNote.description)
    }
  },[currentNote])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(currentNote){
      editNote(currentNote._id,title,description)
    }else{
      addNote(title, description);
    }
   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{currentNote ?"Edit Note" :"Add a Note"}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 transition duration-200 text-lg font-semibold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {currentNote?"Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
