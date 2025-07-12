import { configureStore } from '@reduxjs/toolkit'
import notesreducer from '../notesSlice'

export const store = configureStore({
  reducer: {
    notes: notesreducer
  },
})