import bcrypt from "bcryptjs";

const password = "bismillah";
bcrypt.hash(password, 10).then(console.log);
