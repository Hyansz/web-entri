// seed/postsDummy.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/Post.js";

dotenv.config();

const dummyPosts = [
    {
        title: "5 Cara Mengoptimalkan Kecepatan Internet di Rumah",
        excerpt:
            "Pelajari cara meningkatkan kecepatan internet di rumah dengan tips mudah dan praktis.",
        content: `
      <p>Kecepatan internet yang lambat bisa sangat mengganggu aktivitas online. Berikut beberapa tips untuk mengoptimalkannya:</p>
      <ul>
        <li><strong>Posisi Router:</strong> Tempatkan router di posisi sentral rumah.</li>
        <li><strong>Ganti Channel Wi-Fi:</strong> Pilih channel yang tidak padat.</li>
        <li><strong>Perbarui Firmware:</strong> Router yang terbaru bisa meningkatkan performa.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.cnet.com" target="_blank">CNET</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1581090700227-8e4dcf1d60b1?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Manfaat Minum Air Putih untuk Kesehatan",
        excerpt:
            "Air putih sangat penting bagi kesehatan tubuh. Berikut manfaat utama bagi kesehatan harian Anda.",
        content: `
      <p>Minum cukup air setiap hari membantu tubuh tetap sehat. Beberapa manfaat utama:</p>
      <ul>
        <li>Meningkatkan fungsi otak dan konsentrasi.</li>
        <li>Membantu detoksifikasi tubuh.</li>
        <li>Mendukung metabolisme dan menurunkan berat badan.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.healthline.com/nutrition/7-health-benefits-of-water" target="_blank">Healthline</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1556945371-cc6c7c19a785?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Teknologi 5G: Apa yang Perlu Anda Ketahui",
        excerpt:
            "5G membawa perubahan besar pada dunia komunikasi. Simak informasi pentingnya di sini.",
        content: `
      <p>5G adalah generasi terbaru jaringan seluler yang menawarkan kecepatan tinggi dan latensi rendah.</p>
      <ul>
        <li>Kecepatan download hingga 10x lebih cepat dari 4G.</li>
        <li>Mendukung IoT dan smart city lebih optimal.</li>
        <li>Pengalaman gaming dan streaming lebih lancar.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.qualcomm.com" target="_blank">Qualcomm</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1605902711622-cfb43c4439c9?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Tips Menjaga Kesehatan Mental di Era Digital",
        excerpt:
            "Kesehatan mental penting dijaga, apalagi di era digital yang penuh tekanan.",
        content: `
      <p>Berikut beberapa tips menjaga kesehatan mental:</p>
      <ul>
        <li>Lakukan meditasi dan pernapasan dalam.</li>
        <li>Batasi waktu penggunaan media sosial.</li>
        <li>Jaga pola tidur yang cukup.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.mentalhealth.org.uk" target="_blank">Mental Health UK</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "7 Aplikasi Produktivitas yang Wajib Dicoba",
        excerpt:
            "Tingkatkan produktivitas dengan aplikasi-aplikasi berikut yang mudah digunakan.",
        content: `
      <p>Aplikasi berikut membantu meningkatkan efisiensi kerja dan manajemen waktu:</p>
      <ul>
        <li>Notion – Catatan dan project management.</li>
        <li>Todoist – Manajemen tugas harian.</li>
        <li>Google Calendar – Jadwal dan pengingat.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.techradar.com/best/best-productivity-apps" target="_blank">TechRadar</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Panduan Dasar Memulai Investasi Saham",
        excerpt:
            "Ingin mulai investasi saham? Simak panduan dasar ini sebelum memulai.",
        content: `
      <p>Investasi saham bisa menguntungkan jika dilakukan dengan strategi yang tepat:</p>
      <ul>
        <li>Pahami profil risiko Anda.</li>
        <li>Mulai dari saham blue-chip yang stabil.</li>
        <li>Diversifikasi portofolio untuk mengurangi risiko.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.investopedia.com" target="_blank">Investopedia</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1616599381613-b5791dbb2b56?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Tren Fashion 2025: Minimalis dan Sustainable",
        excerpt:
            "Fashion tahun 2025 mengarah ke gaya minimalis dan ramah lingkungan.",
        content: `
      <p>Gaya fashion modern semakin fokus pada:</p>
      <ul>
        <li>Desain minimalis dan fungsional.</li>
        <li>Bahan ramah lingkungan dan daur ulang.</li>
        <li>Kombinasi warna netral dan natural.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.vogue.com" target="_blank">Vogue</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
    {
        title: "Cara Memulai Blog yang Sukses di 2025",
        excerpt:
            "Ingin menjadi blogger sukses? Ikuti panduan ini untuk memulai dengan baik.",
        content: `
      <p>Langkah-langkah memulai blog yang sukses:</p>
      <ul>
        <li>Pilih niche yang jelas dan spesifik.</li>
        <li>Gunakan platform blog yang profesional.</li>
        <li>Konsisten dalam membuat konten berkualitas.</li>
      </ul>
      <p><em>Sumber: <a href="https://www.wpbeginner.com" target="_blank">WPBeginner</a></em></p>
    `,
        image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?crop=entropy&cs=tinysrgb&fit=crop&w=600&q=80",
    },
];

export default dummyPosts;

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Post.insertMany(dummyPosts);
        console.log("8 artikel dummy berhasil ditambahkan!");
        process.exit(0);
    } catch (err) {
        console.error("Gagal menambahkan dummy posts:", err);
        process.exit(1);
    }
}

run();
