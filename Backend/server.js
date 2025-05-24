const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => 
{    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    console.log('MongoDB connected',`Server started on port ${PORT}`);
}
)
.catch(err => console.error(err));
