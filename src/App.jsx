import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductLab from "./pages/ProductLab";
import ProductLiquid from "./pages/ProductLiquid";
import ProductFurniture from "./pages/ProductFurniture";
import ProductBmhp from "./pages/ProductBmhp";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactForm from "./pages/ContactForm";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import EducationVideo from "./pages/Edu";
import Mitra from "./pages/Mitra";
import ProtectedAdmin from "./components/ProtectedAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Categories from "./pages/Categories";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductDetail from "./pages/ProductDetail";
import Posts from "./pages/Posts";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";
import HistatsTracker from "./components/HistatsTracker";

AOS.init();

export default function App() {
    return (
        <div className="min-h-screen bg-white">
            <HistatsTracker />
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
                    <Route path="/products/lab" element={<ProductLab />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
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
                    <Route
                        path="/admin/posts"
                        element={
                            <ProtectedAdmin>
                                <PostList />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/posts/create"
                        element={
                            <ProtectedAdmin>
                                <PostForm />
                            </ProtectedAdmin>
                        }
                    />
                    <Route
                        path="/admin/posts/edit/:id"
                        element={
                            <ProtectedAdmin>
                                <PostForm />
                            </ProtectedAdmin>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}
