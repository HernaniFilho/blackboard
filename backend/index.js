const express = require("express"); // Import Express
const app = express(); // Create an Express app
const PORT = 3000; // Define the port your server will run on

// Middleware to parse JSON requests
app.use(express.json());

// Define a test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
