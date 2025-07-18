import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCirclePlus } from "react-icons/fa6";
import NoteForm from './NoteForm';
import UpdateNoteForm from './UpdateNoteForm';
import NoteList from './NoteList';
import Navbar from "./NavBar";
import MobileSearchBar from "./MobileSearchBar";
import Welcome from "./Welcome";
// Ensure all necessary Redux actions are imported
import { fetchNotes, addNote, deleteNote, updateNote, getSingleNoteForUpdate, clearNoteToUpdate } from '../features/notes/notesSlice';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast if you're using it here too
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import CSS

const Dashboard = () => {
  const dispatch = useDispatch();

  const allNotesData = useSelector((state) => state.notes.allNotes);
  const noteStatus = useSelector((state) => state.notes.status); // 'idle', 'loading', 'succeeded', 'failed'
  const error = useSelector((state) => state.notes.error);
  const noteToUpdate = useSelector((state) => state.notes.noteToUpdate);
  const isUpdateModalOpen = useSelector((state) => state.notes.isUpdateModalOpen);

  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const token = localStorage.getItem("token");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const initializeDashboardData = async () => {
      if (!token) {
        console.error("Token not found, Unauthorized. Please log in.");
        return;
      }

      try {
        const header = { headers: { Authorization: `Bearer ${token}` } };
        const profileResponse = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/profile`, {}, header);
        const fetchedEmail = profileResponse?.data?.data?.email;
        const userName = profileResponse?.data?.data?.name;

        if(userName){
          localStorage.setItem("username", userName)
        }

        if (fetchedEmail) {
          setUserEmail(fetchedEmail); 
          localStorage.setItem("email", fetchedEmail)
          if (noteStatus === "idle") { 
              dispatch(fetchNotes(fetchedEmail)); 
          }
        } else {
            console.error("User email not found in profile response.");
            toast.error("Could not retrieve user email. Please try logging in again.");
        }
      } catch (error) {
        console.error("Error fetching user profile or notes:", error);
        toast.error("Failed to load user data or notes.");
      }
    };

    initializeDashboardData();
  }, [token, dispatch, noteStatus]);

  useEffect(() => {
    console.log("allNotesData (from Redux store):", allNotesData);
  }, [allNotesData]);


  const filteredNotes = allNotesData.filter((note) => {
    const lowercasedSearch = searchQuery.toLowerCase();
    return (
      note?.heading?.toLowerCase().includes(lowercasedSearch) ||
      note?.paragraph?.toLowerCase().includes(lowercasedSearch)
    );
  });

  const handleAddNoteSubmit = async (noteData) => {
    try {
      
        if (!userEmail) {
            toast.error("User email not available. Please refresh or log in again.");
            return;
        }
        await dispatch(addNote({ noteData, userEmail })).unwrap();
        dispatch(fetchNotes(userEmail));
        setShowAddNewModal(false);
    } catch (err) {
        console.error("Failed to add note:", err);
        toast.error(err.message || "Failed to add note.");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await dispatch(deleteNote(id)).unwrap();
      if (userEmail) { 
        dispatch(fetchNotes(userEmail));
      }
    } catch (err) {
      console.error("Failed to delete note:", err);
      toast.error(err.message || "Failed to delete note.");
    }
  };

  const handleEditNote = async (id) => {
    try {
      await dispatch(getSingleNoteForUpdate(id)).unwrap();
    } catch (err) {
      console.error("Failed to fetch note for update:", err);
      toast.error(err.message || "Failed to fetch note for editing.");
    }
  };

  const handleUpdateNoteSubmit = async (id, updatedData) => {
    try {
      await dispatch(updateNote({ id, updatedData })).unwrap();
     
      if (userEmail) { 
        dispatch(fetchNotes(userEmail));
      }
    } catch (err) {
      console.error("Failed to update note:", err);
      toast.error(err.message || "Failed to update note.");
    }
  };

  const handleCloseUpdateModal = () => {
    dispatch(clearNoteToUpdate());
  };

  return (
    <div className='w-full md:h-screen bg-neutral-900 text-white'>

      {/* Add New Note Modal */}
      <NoteForm
        isOpen={showAddNewModal}
        onClose={() => setShowAddNewModal(false)}
        onSubmit={handleAddNoteSubmit}
        loading={noteStatus === 'loading'}
      />

      {/* Update Note Modal */}
      <UpdateNoteForm
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        noteData={noteToUpdate}
        onSubmit={handleUpdateNoteSubmit}
        loading={noteStatus === 'loading'}
      />

      {/* Floating Add Button for Mobile */}
      {
        token ? <FaCirclePlus onClick={() => setShowAddNewModal(true)}
        className='fixed bottom-8 right-8 z-10 md:hidden text-6xl text-white/80 cursor-pointer hover:text-white drop-shadow-md'
      
      /> : <FaCirclePlus onClick={()=>toast.error("Login/Register to add notes.")} className='fixed bottom-8 right-8 z-10 md:hidden text-6xl text-white/30 cursor-pointer hover:text-white drop-shadow-md' />
      }

      {/* Navbar */}
      <Navbar
        onAddClick={() => setShowAddNewModal(true)}
        onSearchClick={() => setShowMobileSearch(true)}
        onMenuClick={() => setShowSidebar(true)}
        setSearchQuery={setSearchQuery}
      />

      {/* Mobile Search Bar */}
      <MobileSearchBar
        isOpen={showMobileSearch}
        onClose={() => setShowMobileSearch(false)}
        setSearchQuery={setSearchQuery}
      />

      {/* Display Notes */}
      {
        token ? <div className='w-full md:min-h-[80%] px-10 md:px-60 pt-10 grid grid-cols-1 md:grid-cols-3 gap-y-7'>
        {noteStatus === 'loading' && <p className="col-span-full text-center text-xl">Loading notes...</p>}
        {noteStatus === 'failed' && <p className="col-span-full text-center text-xl text-red-500">Error: {error}</p>}
        {noteStatus === 'succeeded' && (
          filteredNotes ? (
            <NoteList notes={filteredNotes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
          ) : (
            <p className="col-span-full text-center text-xl text-neutral-400">No notes found.</p>
          )
        )}
      </div> :  <Welcome />
      }
    </div>
  );
};

export default Dashboard;