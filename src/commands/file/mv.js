import fs from "fs";
import path from "path";
import process from "process";

export const mv = async (filePath, destDir) => {
  const source = path.resolve(process.cwd(), filePath);
  const filename = path.basename(source);
  const destinationDir = path.resolve(process.cwd(), destDir);
  const destination = path.join(destinationDir, filename);

  try {
    
    await fs.promises.access(source);

   
    await fs.promises.mkdir(destinationDir, { recursive: true });

 
    await new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(source);
      const writeStream = fs.createWriteStream(destination, { flags: "wx" });

      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);

      readStream.pipe(writeStream);
    });

    
    await fs.promises.unlink(source);
  } catch {
    throw new Error("Operation failed");
  }
};