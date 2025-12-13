import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String, required: true },
});

schema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.model("Admin", schema);
