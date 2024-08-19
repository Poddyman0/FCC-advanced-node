    <div class="content">
        <h1><strong>Adding Password Hashing and Comparison to Your Node.js Project</strong></h1>
        <h2><strong>Description:</strong></h2>
        <p>In this project, I integrated secure password hashing and comparison functionalities into a Node.js application using the bcrypt library. This approach ensures that passwords are handled securely by hashing them before storage and verifying them efficiently during authentication. Both asynchronous and synchronous methods were implemented to demonstrate how passwords can be hashed and compared in different scenarios.</p>
        
        <h2><strong>Technologies Used:</strong></h2>
        <ul>
            <li><strong>Node.js:</strong> JavaScript runtime for building scalable server-side applications.</li>
            <li><strong>bcrypt:</strong> Library for hashing and comparing passwords securely.</li>
        </ul>

        <h2><strong>Features Implemented:</strong></h2>
        <ul>
            <li><strong>Asynchronous Password Hashing:</strong>
                <ul>
                    <li>Added code to hash passwords asynchronously using bcrypt.hash().</li>
                    <li>Logged the generated hash to the console.</li>
                    <li>Utilized bcrypt.compare() to verify if a given password matches the generated hash.</li>
                </ul>
            </li>
            <li><strong>Synchronous Password Hashing:</strong>
                <ul>
                    <li>Incorporated code to hash passwords synchronously using bcrypt.hashSync().</li>
                    <li>Logged the resulting hash to the console.</li>
                    <li>Compared the hash with the original password using bcrypt.compareSync().</li>
                </ul>
            </li>
            <li><strong>Password Comparison:</strong>
                <ul>
                    <li>Implemented password comparison functionality using bcrypt.compare().</li>
                    <li>Demonstrated the comparison process with both correct and incorrect passwords to ensure accurate verification.</li>
                </ul>
            </li>
        </ul>
    </div>
