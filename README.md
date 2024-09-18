# Full Stack Open Part 12

**Description:**
This project demonstrates the containerization of a Todo App and a Phonebook App using Docker Compose. The apps are built with Node.js, Express, MongoDB, and React.

**Installation:**

1. **Install Docker:** Ensure Docker is installed on your system.
2. **Clone the repository:** `git clone https://github.com/yourusername/full-stack-open-part-12.git`
3. **Install dependencies:** `cd full-stack-open-part-12 && npm install`

**Configuration:**

1. **Set up environment variables:** Create `.env` files in both the `frontend` and `backend` directories.
   - **Frontend:**
     ```
     REACT_APP_BACKEND_URL=http://localhost:3001
     ```
   - **Backend:**
     ```
     MONGO_URI=mongodb://localhost:27017/phonebook
     ```

**Running the project:**

1. **Start Docker Compose:** `docker-compose up`

This will start the MongoDB container, the backend server, and the frontend development server.

**Accessing the apps:**

- **Todo App:** Visit `http://localhost:3000` in your browser.
- **Phonebook App:** Visit `http://localhost:3001` in your browser.

**Technologies:**

- Node.js
- Express
- MongoDB
- React
- Docker
- Docker Compose

**Contributing:**
Feel free to contribute to the project by submitting pull requests or opening issues. Please follow the standard code style and conventions.
