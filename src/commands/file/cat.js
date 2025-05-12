import fs from "fs";
import path from "path";
import process from "process";

export const cat = async (filePath) => {
  const resolvedPath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(resolvedPath, { encoding: "utf-8" });

    stream.on("error", (err) => {
      console.error("Operation failed:", err.message);
      reject(err); 
    });

    stream.on("end", () => {
      process.stdout.write("\n");
      resolve();
    });

    stream.pipe(process.stdout);
  });
};
