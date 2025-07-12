import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar card'>
      <NavLink to="/">Home</NavLink><br />
      <NavLink to="/notes">New Note</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </div>
  )
}
