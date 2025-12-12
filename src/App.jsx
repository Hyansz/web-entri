import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
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
import EducationVideo from "./pages/Edu";
import Mitra from "./pages/Mitra";
import ProductBmhpDetail from "./pages/ProductBmhpDetail";
import ProductLabDetail from "./pages/ProductLabDetail";
import ProtectedAdmin from "./components/ProtectedAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Categories from "./pages/Categories";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductDetail from "./pages/ProductDetail";

AOS.init();

export default function App() {
    return (
        <div className="min-h-screen bg-white">
            <Routes>
                {/* Public Area */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mitra" element={<Mitra />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/edu" element={<EducationVideo />} />
                    <Route path="/contact" element={<ContactForm />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/cutting"
                        element={<ProductCutting />}
                    />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route
                        path="/products/furniture"
                        element={<ProductFurniture />}
                    />
                    <Route
                        path="/products/liquid"
                        element={<ProductLiquid />}
                    />
                    <Route path="/products/bmhp" element={<ProductBmhp />} />
                    <Route
                        path="/products/bmhp/:id"
                        element={<ProductBmhpDetail />}
                    />
                    <Route path="/products/lab" element={<ProductLab />} />
                    <Route
                        path="/products/lab/:id"
                        element={<ProductLabDetail />}
                    />
                </Route>

                {/* Admin Area */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<DashboardLayout />}>
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedAdmin>
                                <AdminDashboard />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/products2"
                        element={
                            <ProtectedAdmin>
                                <ProductList />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/products2/add"
                        element={
                            <ProtectedAdmin>
                                <ProductForm />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/products2/edit/:id"
                        element={
                            <ProtectedAdmin>
                                <ProductForm />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/categories"
                        element={
                            <ProtectedAdmin>
                                <Categories />
                            </ProtectedAdmin>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}
