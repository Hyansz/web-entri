// scripts/fixSpecifications.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const products = await Product.find({
    spesifications: { $exists: true },
});

for (const p of products) {
    if (!p.specifications && p.spesifications) {
        p.specifications = p.spesifications;
    }

    p.spesifications = undefined;
    await p.save();
}

console.log("✅ FIXED ALL DATA");
process.exit();