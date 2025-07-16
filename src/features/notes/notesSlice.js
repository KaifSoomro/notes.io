import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes', 
  async (userEmail) => {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/notes/get-all-notes`,{
      userEmail
    })

    return response?.data?.allNotes;
  }
);

export const addNote = createAsyncThunk(
  'notes/addNote',
  async ({noteData, userEmail}, { rejectWithValue }) => {
    try {

      const data = {
        userEmail: userEmail,
        heading: noteData?.heading,
        paragraph: noteData?.paragraph,
        noteColor: noteData?.noteColor
      }

      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/notes/add-note`, data);
      toast.success("Note added successfully.")
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);


export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/notes/delete-note/${id}`);
      toast.error("Note deleted successfully.")
      return id; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleNoteForUpdate = createAsyncThunk(
  'notes/getSingleNoteForUpdate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notes/get-single-note/${id}`);
      return response.data.singleNote;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/notes/update-note/${id}`, updatedData);
      toast.success("Note updated successfully.")
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const notesSlice = createSlice({
  name: 'notes', 
  initialState: {
    allNotes: [],
    status: 'idle',
    error: null,
    noteToUpdate: null, 
    isUpdateModalOpen: false, 
    isAddNoteModalOpen: false
  },
  reducers: {
   
    openAddNoteModal: (state) => {
      state.isAddNoteModalOpen = true; 
    },
    closeAddNoteModal: (state) => {
      state.isAddNoteModalOpen = false;
    },

    setNoteToUpdate: (state, action) => {
      state.noteToUpdate = action.payload;
      state.isUpdateModalOpen = true;
    },
    clearNoteToUpdate: (state) => {
      state.noteToUpdate = null;
      state.isUpdateModalOpen = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // --- fetchNotes ---
      .addCase(fetchNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allNotes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // --- addNote ---
      .addCase(addNote.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // --- deleteNote ---
      .addCase(deleteNote.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allNotes = state.allNotes.filter(note => note._id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // --- getSingleNoteForUpdate ---
      .addCase(getSingleNoteForUpdate.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(getSingleNoteForUpdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.noteToUpdate = action.payload;
        state.isUpdateModalOpen = true;
      })
      .addCase(getSingleNoteForUpdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // --- updateNote ---
      .addCase(updateNote.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.allNotes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.allNotes[index] = action.payload;
        }
        state.noteToUpdate = null; 
        state.isUpdateModalOpen = false; 
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});


export const { setNoteToUpdate, clearNoteToUpdate, openAddNoteModal, closeAddNoteModal } = notesSlice.actions;

export default notesSlice.reducer;