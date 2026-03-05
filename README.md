Healthcare Appointment Portal
A full-stack MERN (MongoDB, Express, React, Node.js) application that allows Doctors to manage their availability and Patients to book medical appointments in real-time.

Features
Dual-Role Authentication: Separate registration and login flows for Doctors and Patients.

Availability Management: Doctors can add specific dates and time slots for consultations.

Booking System: Patients can view available doctors and book specific time slots.

Real-time Status: Slots automatically update to "Full" once booked.

Appointment Management: Both doctors and patients can view their upcoming schedules and cancel appointments (which automatically re-opens the slot).

Tech Stack
Frontend: React (Vite), Tailwind CSS, DaisyUI, Axios.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Mongoose ODM).

Auth: JSON Web Tokens (JWT) & Bcryptjs.

installation & Setup
1. Clone the repository
Bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Backend Setup
Navigate to the backend folder: cd backend

Install dependencies: npm install

Create a .env file and add:

Code snippet
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the server: npm run dev

3. Frontend Setup
Navigate to the frontend folder: cd ../frontend

Install dependencies: npm install

Create a .env file and add:

Code snippet
VITE_API_URL=http://localhost:5001/api
Start the app: npm run dev




Method,Endpoint,Description
POST,/api/users/register,Register new user (Doctor/Patient)
POST,/api/users/login,Login and receive JWT
POST,/api/doctors/availability,Doctor adds a time slot
GET,/api/users/doctors,Patient fetches all doctors/slots
POST,/api/appointments/book,Patient books a slot
DELETE,/api/appointments/:id,Cancel/Delete an appointment


team members and their contributions 

Jasir k a -  Dhaanish ahmed institute of technology = completed backend using nodejs , developed the core logics 

Harini j -   Dhaanish ahmed institute of technology = Provided the react frontent pages compatible with the backend logic

Vasanika  - Rathinam institute of technology = developed various logics in the frontend and executed and demonstrated the flow of project thorugh ppt presentation

Irfan - Dhaanish ahmed institute of technology = Provided team support and tested the project in and out




jasirhuuzain@gmail.com,

vasanika06@gmail.com
