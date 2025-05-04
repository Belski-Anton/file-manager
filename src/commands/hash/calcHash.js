import crypto from "crypto";
import fs from "fs";
import path from "path";
import process from "process";

export const calcHash = async (filePath) => {
  try {
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(resolvedPath);

    stream.on("error", () => {
      console.log("Operation failed");
    });

    stream.on("data", (chunk) => {
      hash.update(chunk);
    });

    stream.on("end", () => {
      console.log(hash.digest("hex"));
    });
  } catch {
    console.log("Operation failed");
  }
};
