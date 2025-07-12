import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link,useSearchParams } from 'react-router-dom';
import { createNewNote,deleteNote,updateNote } from '../notesSlice';
import { ToastContainer, toast } from 'react-toastify';

export function Createnotes() {
  const [title,settitle] = useState("");
  const [content,setcontent] = useState("");
  const [searchParams,setSearchParams] = useSearchParams();
  const notesid = searchParams.get("notes");
  const dispatch = useDispatch();
  const allnotes = useSelector((state)=>state.notes.notes || []);
  const notify = () => toast("Deleted successfully");
  const create = () => toast("Note created successfully");
  const update = () => toast("Note updated success");


  useEffect(() => {
    if (notesid) {
      const note = allnotes.find((note) => note.id === notesid);
      if (note) {
        settitle(note.title);
        setcontent(note.content);
      } else {
        alert(`Note with id ${notesid} not found.`);
      }
    }
  }, [notesid, allnotes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill in all fields before updating the note.");
      return;
    }
    const note = {
      title,
      content,
      id: notesid ? notesid : new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    };
    if (notesid) {
      dispatch(updateNote(note));
      setSearchParams({});
      update()
    } else {
      dispatch(createNewNote(note));
      create();
    }
    settitle("");
    setcontent("");
  };
  const notes = useSelector((state) => state.notes.notes || []);
  const [search, setsearch] = useState("");
  const filtereddata = notes.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  const handledelete = (id) => {
    dispatch(deleteNote({ id }));
    notify();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='card card-body'>
            <label className='text' htmlFor='title'>Title</label>
            <input
              name='title'
              className='text'
              type="text"
              onChange={(e) => settitle(e.target.value)}
              value={title}
              placeholder="Title"
            />
            <label className='text' htmlFor='value'>Note</label>
            <textarea
              name="value"
              className='text'
              placeholder="Take a note..."
              rows={10}
              value={content}
              onChange={(e) => setcontent(e.target.value)}
            />
            <button className='text button' type="submit">
              {notesid ? "Update Note" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className="card card-body">
        <input
          className='text'
          type="text"
          placeholder="search notes"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        {filtereddata.length > 0 ? (
          filtereddata.map((note) => (
            <div className='Box' key={note.id}>
              <section>
                <h2 className='text'>{note.title}</h2>
                <p className='text'>
                  {note.content.length > 10 ? `${note.content.slice(0, 10)}...` : note.content}
                </p>
              </section>
              <span className='section-2'>
                <button className='button' onClick={() => handledelete(note.id)}>Delete</button>
                <button className='button'>
                  <Link to={`/notes?notes=${note.id}`}>Edit</Link>
                </button>
                <button className='button'>
                  <Link to={`/editnotes/${note.id}`}>View</Link>
                </button>
                <p className='button'>{new Date(note.createdAt).toLocaleString()}</p>
              </span>
            </div>
          ))
        ) : (
          <div className='text'>No notes found</div>
        )}
      </div>
    </>
  );
}