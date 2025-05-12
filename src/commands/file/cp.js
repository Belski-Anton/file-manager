import fs from "fs";
import path from "path";
import process from "process";

export const cp = async (filePath, destDir) => {
  try {
    const source = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    const filename = path.basename(source);

    const destination = path.isAbsolute(destDir)
      ? path.join(destDir, filename)
      : path.resolve(process.cwd(), destDir, filename);


    await fs.promises.access(source);

   
    await fs.promises.mkdir(path.dirname(destination), { recursive: true });


    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination, { flags: "wx" });

    return new Promise((resolve, reject) => {
      readStream.on("error", reject);
      writeStream.on("error", reject);
      writeStream.on("finish", resolve);
      readStream.pipe(writeStream);
    });
  } catch (err) {
    console.error(`Error during copy: ${err.message}`);
    throw new Error("Operation failed");
  }
};