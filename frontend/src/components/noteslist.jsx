import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, Shownotes } from '../notesSlice'
import { Link } from 'react-router-dom'

export const Noteslist = () => {
  const notes = useSelector((state) => state.notes.notes || [])
  const [search, setsearch] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Shownotes())
  }, [dispatch])
  const filtereddata = notes.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  )
  const handledelete = (id) => {
    dispatch(deleteNote({id}))
  }
  return (
    <div className="card card-body">
      <input
        className="text"
        type="text"
        placeholder="search notes"
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />
      {filtereddata.length > 0 ? (
        filtereddata.map((note) => (
          <div className="Box" key={note.id}>
            <section>
              <h2 className="text">{note.title}</h2>
              <p className="text">{note.content}</p>
            </section>
            <span className="section-2">
              <button className="button" onClick={() => handledelete(note.id)}>Delete</button>
              <button className="button">
                <Link to={`/notes?notes=${note.id}`}>Edit</Link>
              </button>
              <button className="button">
                <Link to={`/editnotes/${note.id}`}>View</Link>
              </button>
              <p className="button">{new Date(note.createdAt).toLocaleString()}</p>
            </span>
          </div>
        ))
      ) : (
        <div className="text">No notes found</div>
      )}
    </div>
  )
}