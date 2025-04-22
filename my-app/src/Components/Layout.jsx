import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
<div>
  <header>
    <nav>
      <ul classname='overflow-hidden bg-orange-600 flex justify-end'>
        <li>
          <Link classname="block text-orange-400 text-center p-4 hover:text-orange-100" to="/">Home</Link>
        </li>
        <li>
          <Link classname="block text-orange-400 text-center p-4 hover:text-orange-100" to="/profile">Profile</Link>
        </li>
        <li>
          <Link classname="block text-orange-400 text-center p-4 hover:text-orange-100" to="/upload">Upload</Link></li>
        <li>
          <Link classname="block text-orange-400 text-center p-4 hover:text-orange-100" to="/login">Login</Link>
        </li>
        <li>
          <Link classname="block text-orange-400 text-center p-4 hover:text-orange-100" to="/logout">Logout</Link>
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
