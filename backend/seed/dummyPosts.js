import Post from "../models/Post.js";

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
        image: "https://via.placeholder.com/600x400?text=Internet+Speed",
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
        image: "https://via.placeholder.com/600x400?text=Water+Benefits",
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
        image: "https://via.placeholder.com/600x400?text=5G+Technology",
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
        image: "https://via.placeholder.com/600x400?text=Mental+Health",
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
        image: "https://via.placeholder.com/600x400?text=Productivity+Apps",
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
        image: "https://via.placeholder.com/600x400?text=Stock+Investment",
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
        image: "https://via.placeholder.com/600x400?text=Fashion+2025",
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
        image: "https://via.placeholder.com/600x400?text=Start+Blog",
    },
];

// Insert dummy data ke MongoDB
const insertDummyPosts = async () => {
    try {
        await Post.insertMany(dummyPosts);
        console.log("8 artikel dummy berhasil ditambahkan!");
    } catch (err) {
        console.error(err);
    }
};

export default insertDummyPosts;
