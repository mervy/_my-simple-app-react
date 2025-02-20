import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.error('Erro na conexão com MongoDB:', error.message);
        process.exit(1);
    }
};

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: { 
          type: String, 
          required: true },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

const router = express.Router();

// Rotas
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content, image });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post não encontrado' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/posts/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) return res.status(404).json({ message: 'Post não encontrado' });
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post não encontrado' });
        res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
connectDB();

// Rotas
app.use('/api', router);

// Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo deu errado!' });
});

// Servidor
const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
