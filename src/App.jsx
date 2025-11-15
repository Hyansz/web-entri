import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductFurnitureDetail from "./pages/ProductFurnitureDetail";
import ProductLab from "./pages/ProductLab";
import ProductLiquid from "./pages/ProductLiquid";
import ProductFurniture from "./pages/ProductFurniture";
import ProductBmhp from "./pages/ProductBmhp";
import ProductCutting from "./pages/ProductCutting";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./pages/ContactForm";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import WaPhone from "./components/WaPhone";
import EducationVideo from "./pages/Edu";
import Mitra from "./pages/Mitra";
import ToTop from "./components/ToTop";
import ProductLiquidDetail from "./pages/ProductLiquidDetail";

AOS.init();

export default function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-white mx-auto">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/mitra" element={<Mitra />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/edu" element={<EducationVideo />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/contact" element={<ContactForm />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/furniture"
                            element={<ProductFurniture />}
                        />
                        <Route
                            path="/products/furniture/:id"
                            element={<ProductFurnitureDetail />}
                        />
                        <Route
                            path="/products/liquid"
                            element={<ProductLiquid />}
                        />
                        <Route
                            path="/products/liquid/:id"
                            element={<ProductLiquidDetail />}
                        />
                        <Route
                            path="/products/bmhp"
                            element={<ProductBmhp />}
                        />
                        <Route path="/products/lab" element={<ProductLab />} />
                        <Route
                            path="/products/cutting"
                            element={<ProductCutting />}
                        />
                    </Routes>
                </main>
                <Footer />
                <ToTop />
                <WaPhone />
            </div>
        </Router>
    );
}
