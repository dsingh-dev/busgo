import path from "node:path";
import dotenv from "dotenv";

// Load backend/.env and override shell — otherwise if DATABASE_URL/JWT_SECRET are
// already set in the environment (even empty), dotenv injects 0 vars and tokens
// won't match the secret in the file.
dotenv.config({ path: path.resolve(process.cwd(), ".env"), override: true });

import app from "../app";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});