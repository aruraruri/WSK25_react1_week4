import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
<div>
  <header>
    <h1 className='text-center text-4xl font-bold text-orange-200 mb-4'>My Media App</h1>
    <nav>
      <ul className='overflow-hidden bg-orange-600 flex justify-end list-none p-4 rounded-lg'>
        <li>
          <Link className="block text-orange-200 text-center p-4 hover:bg-[#682505]" to="/">Home</Link>
        </li>
        <li>
          <Link className="block text-orange-200 text-center p-4 hover:bg-[#682505]" to="/profile">Profile</Link>
        </li>
        <li>
          <Link className="block text-orange-200 text-center p-4 hover:bg-[#682505]" to="/upload">Upload</Link></li>
        <li>
          <Link className="block text-orange-200 text-center p-4 hover:bg-[#682505]" to="/login">Login</Link>
        </li>
        <li>
          <Link className="block text-orange-200 text-center p-4 hover:bg-[#682505]" to="/logout">Logout</Link>
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
