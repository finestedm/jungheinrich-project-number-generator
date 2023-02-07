import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/posts', postRoutes)
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.send('Hello to numbering API')
});


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));