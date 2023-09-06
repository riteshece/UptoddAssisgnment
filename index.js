const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://ratneshnath:RATNESh99@cluster0.x9keh.mongodb.net/group-14Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// Load routes
const userRoutes = require('./routes/userRoutes');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');

// Use routes
app.use('/', userRoutes);
app.use('/', pollRoutes);
app.use('/', voteRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
