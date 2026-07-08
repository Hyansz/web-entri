/**
 * MIGRATION SCRIPT: Regenerate slug untuk semua produk existing
 * ----------------------------------------------------------------
 * Tujuan:
 *   Banyak produk lama punya field `slug` yang tidak sinkron dengan
 *   `name` saat ini (karena update sebelumnya tidak ikut regenerate slug).
 *   Script ini akan menghitung ulang slug dari `name` untuk SEMUA produk,
 *   dan menghindari duplikat slug dengan menambahkan suffix angka.
 *
 * Cara pakai:
 *   1. npm install slugify mongoose dotenv   (jika belum ada)
 *   2. Pastikan file .env berisi MONGO_URI (atau sesuaikan di bawah)
 *   3. Jalankan: node migrateProductSlugs.js
 *
 * Rekomendasi:
 *   - BACKUP database dulu sebelum menjalankan ini di production.
 *   - Jalankan dulu dengan DRY_RUN = true untuk melihat perubahan
 *     tanpa benar-benar menyimpan ke database.
 */

import mongoose from "mongoose";
import slugify from "slugify";
import dotenv from "dotenv";
import Product from "../models/Product.js"; // sesuaikan path model kamu

dotenv.config();

// ==== KONFIGURASI ====
const DRY_RUN = false; // ubah ke false kalau sudah yakin mau menyimpan perubahan
const MONGO_URI = process.env.MONGO_URI;

function generateBaseSlug(name) {
    return slugify(name, { lower: true, strict: true, trim: true });
}

async function run() {
    console.log(`\n🔧 Mode: ${DRY_RUN ? "DRY RUN (tidak menyimpan)" : "LIVE (akan menyimpan ke database)"}\n`);

    await mongoose.connect(MONGO_URI);
    console.log("✅ Terhubung ke MongoDB\n");

    const products = await Product.find({}).sort({ createdAt: 1, _id: 1 });
    console.log(`📦 Ditemukan ${products.length} produk\n`);

    // Untuk melacak slug yang sudah dipakai supaya tidak duplikat
    const usedSlugs = new Set();

    let changedCount = 0;
    let unchangedCount = 0;

    for (const product of products) {
        const baseSlug = generateBaseSlug(product.name);
        let finalSlug = baseSlug;
        let counter = 2;

        // Kalau slug sudah dipakai produk lain, tambahkan suffix -2, -3, dst
        while (usedSlugs.has(finalSlug)) {
            finalSlug = `${baseSlug}-${counter}`;
            counter++;
        }

        usedSlugs.add(finalSlug);

        if (product.slug === finalSlug) {
            unchangedCount++;
            continue;
        }

        console.log(
            `✏️  "${product.name}"\n    slug lama : ${product.slug || "(kosong)"}\n    slug baru : ${finalSlug}\n`
        );

        changedCount++;

        if (!DRY_RUN) {
            product.slug = finalSlug;
            await product.save();
        }
    }

    console.log("----------------------------------------");
    console.log(`Total produk       : ${products.length}`);
    console.log(`Slug diubah        : ${changedCount}`);
    console.log(`Slug sudah sesuai  : ${unchangedCount}`);
    console.log("----------------------------------------");

    if (DRY_RUN) {
        console.log("\n⚠️  Ini masih DRY RUN. Tidak ada perubahan yang disimpan.");
        console.log("   Set DRY_RUN = false di script ini untuk benar-benar menyimpan.\n");
    } else {
        console.log("\n✅ Selesai! Semua slug sudah diperbarui di database.\n");
    }

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error("❌ Terjadi error saat migrasi:", err);
    process.exit(1);
});
