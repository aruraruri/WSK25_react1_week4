import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
<div>
  <header>
    <nav>
      <ul className='overflow-hidden bg-orange-600 flex justify-end list-none p-4'>
        <li>
          <Link className="block text-orange-400 text-center p-4 hover:bg-[#d48c8c]" to="/">Home</Link>
        </li>
        <li>
          <Link className="block text-orange-400 text-center p-4 hover:bg-[#d48c8c]" to="/profile">Profile</Link>
        </li>
        <li>
          <Link className="block text-orange-400 text-center p-4 hover:bg-[#d48c8c]" to="/upload">Upload</Link></li>
        <li>
          <Link className="block text-orange-400 text-center p-4 hover:bg-[#d48c8c]" to="/login">Login</Link>
        </li>
        <li>
          <Link className="block text-orange-400 text-center p-4 hover:bg-[#d48c8c]" to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <Outlet />
  </main>
</div>
</>
)};

export default Layout;
