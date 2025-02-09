import { Outlet } from 'react-router-dom';

import Toast from './components/Toast';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="bg-gray-50 h-screen overflow-hidden flex flex-col">
      <Navbar />

      <div className="w-[960px] bg-white mx-auto my-4 h-full overflow-hidden shadow-md">
        <Outlet />
      </div>

      <Toast />
    </main>
  );
}

export default App;
