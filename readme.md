# Task Management System

## Overview

This Task Management System is a web application designed to help users manage their tasks effectively. Users can sign up, log in, create, view, update, and delete (soft delete) tasks. The application uses JWT for secure session management, and user passwords are hashed before being stored in the database.

## Features

- **User Authentication:**

  - **Sign Up:** Users can create a new account.
  - **Login:** Users can log in to their existing account.
  - **JWT Authentication:** Secure session management using JSON Web Tokens.
  - **Password Security:** User passwords are hashed using bcrypt before being stored in the database.

- **Task Management:**
  - **Create Task:** Users can create new tasks.
  - **View Tasks:** Users can view all their tasks in one place.
  - **Update Task:** Users can edit their existing tasks.
  - **Delete Task (Soft Delete):** Users can soft delete tasks, meaning they can be archived rather than permanently deleted.

## Tech Stack

- **Frontend:**

  - React
  - Tailwind CSS
  - Axios (for HTTP requests)

- **Backend:**
  - Node.js
  - Express.js
  - JWT (for authentication)
  - bcrypt (for password hashing)
  - PostgreSQL (as the database)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ramighazzawi2002/Task-Management-System.git
   cd task-management-system
   ```

2. **Backend Setup:**

   - Navigate to the `backend` directory:

     ```bash
     cd backend
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Set up environment variables by creating a `.env` file in the `backend` directory with the following:

     ```env
     PORT=5000
     DATABASE_URL=your_postgresql_database_url
     JWT_SECRET=your_jwt_secret_key
     ```

   - Run the server:

     ```bash
     npm start
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory:

     ```bash
     cd ../frontend
     ```

   - Install the required dependencies:

     ```bash
     npm install
     ```

   - Start the development server:

     ```bash
     npm run dev
     ```

4. **Access the application:**

   - The frontend will be available at `http://localhost:3000`.
   - The backend server will run on `http://localhost:5000`.

## Usage

1. **Sign Up:** Create a new account by providing an email and password.
2. **Log In:** Log in to your account to access the task management features.
3. **Task Management:**
   - Create a new task.
   - View all tasks.
   - Edit existing tasks.
   - Soft delete tasks when no longer needed.

## Folder Structure

```bash
task-management-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── home.jsx
    │   ├── loginForm.jsx
    │   ├── signUpForm.jsx
    │   └── main.jsx
    └── public/
```

## License

This project is licensed under the MIT License.

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact

For any queries or feedback, reach out to me at [rami.ghazzawiabed@gmail.com].

---

Feel free to customize this further based on your project specifics!
