
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
export const Viewnotes = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const allnotes = useSelector((state) => state.notes.notes || []);
  const note = allnotes.find((note) => note.id === id)

  return (
    <div className="card card-body">
      <label className='text' htmlFor='title'>Title</label>
      <input
        name='title'
        className='text'
        type="text"
        disabled
        value={note.title}
        placeholder="Title"
      />
      <label className='text' htmlFor='value'>Note</label>
      <textarea
        name="value"
        className='text'
        placeholder="Take a note..."
        rows={10}
        value={note.content}
        disabled
      />
      <button className='text section-2 button' onClick={() => navigate("/")}>Back</button>
    </div>
  );
};
