import { Link } from 'react-router-dom';

import message from '../languages/en';

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">
          {message.PAGE[404]}
        </h1>

        <p className="text-3xl font-semibold text-gray-800 mt-4">
          {message.PAGE.PAGE_NOT_FOUND}
        </p>
        <p className="text-lg text-gray-600 mt-2">
          {message.PAGE.PAGE_DOESNOT_EXIST}
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {message.PAGE.GO_BACK_HOME}
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
