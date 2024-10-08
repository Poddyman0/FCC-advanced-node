<strong>Project Title: Real-Time Chat Application with Authentication</strong>

<strong>Description:</strong>
I built a real-time chat application with a robust sign-in system using Node.js and Express.js. The application allows users to register, log in, and engage in live chat. To ensure secure authentication, I integrated Passport.js for user management, while Pug was used for creating reusable and dynamic templates. For real-time communication, I utilized WebSockets via Socket.IO.

<strong>Technologies Used:</strong>

<ul>
  <li><strong>Node.js:</strong> JavaScript runtime for building scalable server-side applications.</li>
  <li><strong>Express.js:</strong> Web framework for Node.js, used to handle routing and server-side logic.</li>
  <li><strong>Passport.js:</strong> Middleware for handling authentication.</li>
  <li><strong>Pug:</strong> Templating engine for generating HTML dynamically.</li>
  <li><strong>Socket.IO:</strong> Library for enabling real-time, bidirectional communication between clients and server.</li>
  <li><strong>bcryptjs:</strong> Library for hashing passwords and ensuring secure user authentication.</li>
  <li><strong>connect-flash:</strong> Middleware for displaying flash messages (like error or success messages).</li>
</ul>
<strong>Features:</strong>

<ul>
  <li><strong>User Authentication:</strong> Implemented user registration and login functionality with Passport.js, ensuring secure sign-in and session management.</li>
  <li><strong>Real-Time Chat:</strong> Enabled live chat functionality using WebSockets, allowing users to send and receive messages instantly.</li>
  <li><strong>Dynamic Templates:</strong> Created dynamic and reusable front-end templates with Pug for seamless user experience and interface consistency.</li>
  <li><strong>Flash Messages:</strong> Incorporated flash messages to provide feedback during user registration, login, and other actions.</li>
  <li><strong>Static and Real-Time Content:</strong> Delivered static content and real-time updates, ensuring users have access to current information and interactions.</li>
</ul>
Setup Instructions and Running the Code in a Browser
Download the Project
Clone or download the project files from the repository.

Navigate to Project Directory
Open a terminal and navigate (cd) into the project directory.

Install Dependencies
Run the following command to install the necessary Node.js packages:

bash
Copy code
npm install
Set Up Environment Variables
Create a .env file in the root directory and add any required environment variables (like database credentials, API keys, etc.).

Start the Server
Run the application:

bash
Copy code
npm start
For development with auto-reloading, use:

bash
Copy code
npm run dev
Access the Application in Your Browser
Open the app in your browser at http://localhost:3000/ (or the port specified in your .env file).
