<<<<<<< HEAD
# random_team_generator
Random Team Generator is a React-based application designed to help users create random teams
=======
Random Team Generator
React Vite TailwindCSS Supabase

Random Team Generator is a React-based application designed to help users create random teams from a pool of participants. Whether you're organizing a sports event, a classroom activity, or a team-building exercise, this tool ensures fairness and efficiency in team assignments.

Table of Contents
Features
Installation
Usage
Scripts
Dependencies
Contributing
License
Features
Dynamic Team Generation : Generate random teams with customizable sizes.
Responsive Design : Built with TailwindCSS for a sleek and responsive UI.
Data Persistence : Integrated with Supabase for storing participant data and team configurations.
Validation and Feedback : Utilizes react-hook-form and react-toastify for form validation and user feedback.
Routing : Powered by react-router-dom for seamless navigation.
Developer Tools : Includes ESLint, Prettier, and TypeScript for maintainable and clean code.
Installation
Prerequisites
Node.js (v18 or higher)
npm or yarn
Steps
Clone the repository:
bash
Copy
1
git clone https://github.com/your-username/random_team_generator.git
Navigate to the project directory:
bash
Copy
1
cd random_team_generator
Install dependencies:
bash
Copy
1
npm install
or
bash
Copy
1
yarn install
Usage
Development Mode
To start the development server:

bash
Copy
1
npm run dev
or

bash
Copy
1
yarn dev
This will launch the app in your default browser at http://localhost:5173.

Building for Production
To build the project for production:

bash
Copy
1
npm run build
The production-ready files will be generated in the dist folder.

Previewing the Build
To preview the production build locally:

bash
Copy
1
npm run preview
Scripts
dev
Starts the development server with Vite.
build
Builds the project for production.
lint
Lints the code using ESLint.
preview
Previews the production build locally.
format
Formats the code using Prettier.
test
Runs tests using Vitest.

Dependencies
Core Libraries
React & React DOM : The foundation of the application.
React Router DOM : Handles routing and navigation.
TailwindCSS : Provides utility-first styling.
Supabase : Backend-as-a-service for database and authentication.
React Query : Manages server state and caching.
React Hook Form : Simplifies form handling and validation.
React Toastify : Displays toast notifications for user feedback.
Utility Libraries
Lodash : Utility functions for common tasks.
clsx : Conditional class names for TailwindCSS.
Dotenv : Manages environment variables.
>>>>>>> 3785fd5 (Initial commit)
