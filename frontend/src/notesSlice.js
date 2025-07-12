import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createNewNote = createAsyncThunk(
  'notes/createNewNote',
  async (note,{ rejectWithValue }) => {
    const payload = {
      Title: note.title,
      Description: note.content,
    }
    const response = await fetch('http://localhost:5000/create', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      return rejectWithValue("Error creating note")
    }
    try {
      const result = await response.json()
      if (!result.success) {
        return rejectWithValue(result.message)
      }
      const createdNote = {
        id: result.data._id,
        title: result.data.Title,
        content: result.data.Description,
        createdAt: new Date().toISOString()
      }
      return createdNote
    } catch (error) {
      return rejectWithValue("Error parsing created note",error)
    }
  }
)
export const Shownotes = createAsyncThunk(
  'notes/shownotes',
  async (_, { rejectWithValue }) => {
    const response = await fetch('http://localhost:5000/get', { method: "GET" })
    try {
      const result = await response.json()
      if (!result.success) {
        return rejectWithValue(result.message)
      }
      const notes = result.data.map((note) => ({
        id: note._id,
        title: note.Title,
        content: note.Description,
        createdAt: new Date().toISOString()
      }))
      return notes
    } catch (error) {
      return rejectWithValue("Error parsing notes data",error)
    }
  }
)

// Delete a note
export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (note, { rejectWithValue }) => {
    const response = await fetch(`http://localhost:5000/notes/${note.id}`, { method: "DELETE" })
    if (!response.ok) {
      return rejectWithValue("Error deleting note")
    }
    try {
      const result = await response.json()
      if (!result.success) {
        return rejectWithValue(result.message)
      }
      return { id: result.data._id }
    } catch (error) {
      return rejectWithValue("Error parsing delete response"  ,error.message)
    }
  }
)

// Update a note
export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async (note, { rejectWithValue }) => {
    const payload = {
      Title: note.title,
      Description: note.content,
    }
    const response = await fetch(`http://localhost:5000/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      return rejectWithValue("Error updating note")
    }
    try {
      const result = await response.json()
      if (!result.success) {
        return rejectWithValue(result.message)
      }
      const updatedNote = {
        id: result.data._id,
        title: result.data.Title,
        content: result.data.Description,
        createdAt: note.createdAt || new Date().toISOString()
      }
      return updatedNote
    } catch (error) {
      return rejectWithValue("Error parsing update response",error.message)
    }
  }
)

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewNote.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewNote.fulfilled, (state, action) => {
        state.loading = false
        state.notes.push(action.payload)
      })
      .addCase(createNewNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(Shownotes.pending, (state) => {
        state.loading = true
      })
      .addCase(Shownotes.fulfilled, (state, action) => {
        state.loading = false
        state.notes = action.payload
      })
      .addCase(Shownotes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false
        const { id } = action.payload
        state.notes = state.notes.filter((note) => note.id !== id)
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateNote.pending, (state) => {
        state.loading = true
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false
        state.notes = state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        )
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default notesSlice.reducer