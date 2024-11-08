import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Notecard = ({ note, onEdit, deleteNote}) => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between h-full relative">
      <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
      <p className="text-gray-600 mt-2">{note.description}</p>

      {/* Edit and Delete buttons placed at the top right */}
      <div className="absolute top-4 right-4 flex space-x-3">
        <button className="text-blue-500 hover:text-blue-600"
            onClick={()=>onEdit(note)}
        >
          <FaEdit />
        </button>
        <button className="text-red-500 hover:text-red-600"
            onClick={()=>deleteNote(note._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Notecard;
