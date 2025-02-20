import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_RENDER_SERVER_URL 
    : import.meta.env.VITE_LOCAL_SERVER_URL;   

    console.log("React MODE:", import.meta.env.MODE)
    console.log("API_URL:", API_URL)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Erro ao carregar posts');
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                setError("O servidor da api está rodando?", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const Header = () => (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand href="#home">
                    <i className="bi bi-pen me-2"></i>
                    Blog React
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">
                            <i className="bi bi-house-door me-1"></i>
                            Home
                        </Nav.Link>
                        <Nav.Link href="#novo-post">
                            <i className="bi bi-plus-circle me-1"></i>
                            Novo Post
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

    const Footer = () => (
        <footer className="bg-dark text-light py-4 mt-4">
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Blog React</h5>
                        <p>Tudo sobre React e desenvolvimento web</p>
                    </Col>
                    <Col md={6} className="text-end">
                        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );

    const PostCard = ({ post }) => (
        <Col md={4} className="mb-4">
            <Card>
                {post.image && <Card.Img variant="top" src={post.image} alt={post.title} />}
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text className="text-muted small">
                        <i className="bi bi-calendar-event me-1"></i>
                        {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </Card.Text>
                    <Card.Text className="flex-grow-1">{post.content.substring(0, 100)}...</Card.Text>
                    <button className="btn btn-primary btn-sm mt-auto text-">
                        <i className="bi bi-arrow-right me-1"></i>
                        Ler Mais
                    </button>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-grow-1">
                <Container className="py-4">
                    <h1 className="mb-4">Últimos Posts</h1>

                    {loading && (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </Spinner>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    {!loading && !error && (
                        <Row>
                            {posts.length > 0 ? (
                                posts.map((post) => <PostCard key={post._id} post={post} />)
                            ) : (
                                <Col>
                                    <Alert variant="info">Nenhum post encontrado</Alert>
                                </Col>
                            )}
                        </Row>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
}

export default App;
