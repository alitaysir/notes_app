import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import axios from "axios";
import Notecard from "../components/Notecard";
import { useAuth } from "../context/ContextProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const [ismodalopen, setismodalopen] = useState(false);
  const [notes, setnotes] = useState([]);
  const [currentNote, setcurrentNote] = useState(null);
  const [query, setquery] = useState("");
  const [filterednotes, setfilterednotes] = useState([]);

  const { user } = useAuth();

  const closeModal = () => {
    setismodalopen(false);
  };

  useEffect(() => {
    fetchnote();
  }, []);

  useEffect(() => {
    setfilterednotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchnote = async () => {
    try {
      const { data } = await axios.get("https://notes-application-backend-uy6y.onrender.com/api/note");
      setnotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "https://notes-application-backend-uy6y.onrender.com/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchnote();
        closeModal();
        //toast.success("Note added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `https://notes-application-backend-uy6y.onrender.com/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchnote();
        closeModal();
        //toast.success("Notes updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `https://notes-application-backend-uy6y.onrender.com/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchnote();
        //toast.success("Note deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = async (note) => {
    setismodalopen(true);
    setcurrentNote(note);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar fixed at the top */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar setquery={setquery} />
      </div>

      {/* Content container with padding to avoid overlap */}
      <div className="pt-20 flex-grow overflow-y-auto">
        {/* Container for notes, applying grid layout */}
        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {filterednotes.length > 0 ? (
              filterednotes.map((note) => (
                <Notecard
                  key={note._id}
                  note={note}
                  onEdit={onEdit}
                  deleteNote={deleteNote}
                />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center min-h-screen">
                <div className="text-center text-3xl font-semibold text-gray-700 bg-gray-100 py-8 px-12 rounded-lg shadow-md border border-gray-300">
                  No Notes
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">
              Login to proceed
            </h3>
            <p className="text-gray-500 text-lg mb-6">
              Please log in to view and manage your notes.
            </p>
            <Link
              to="/login"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>

      {/* Floating button for adding a new note */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => setismodalopen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-3xl font-bold rounded-full h-12 w-12 flex items-center justify-center shadow-md transition duration-200"
        >
          +
        </button>
      </div>

      {/* Modal for adding or editing notes */}
      {ismodalopen && (
        <Modal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
