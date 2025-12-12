import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

async function run() {
    await mongoose.connect(process.env.MONGO_URI);
    const email = "admin@gmail.com";
    const password = "bismillah";
    const exists = await Admin.findOne({ email });
    if (exists) {
        console.log("Admin already exists");
        process.exit(0);
    }
    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hash });
    console.log("Admin created:", email, password);
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
