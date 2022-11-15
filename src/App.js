import { Container } from "react-bootstrap";
import "./bootstrap.min.css";
import "./index.css";
import { BrowserRouter , Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
        <Routes>
        <Route path='/' element={<HomeScreen/>} exact/>
        <Route path='/product/:id' element={<ProductScreen/>} />
        <Route path='/cart/:id' element={<CartScreen/>} />
        </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
