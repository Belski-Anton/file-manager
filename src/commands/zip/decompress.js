
import fs from "fs";
import path from "path";
import process from "process";
import zlib from "zlib";

const { createReadStream, createWriteStream } = fs;
const { createBrotliDecompress } = zlib;

export const decompress = async (inputPath, outputPath) => {
  try {
    
    const inputFullPath = path.isAbsolute(inputPath)
      ? inputPath
      : path.resolve(process.cwd(), inputPath);

    let outputFullPath = path.isAbsolute(outputPath)
      ? outputPath
      : path.resolve(process.cwd(), outputPath);

    
    if (outputFullPath.endsWith(".gz")) {
      outputFullPath = outputFullPath.slice(0, -3);
    }

   
    try {
      await fs.promises.access(path.dirname(outputFullPath));
    } catch {
      throw new Error("Destination directory does not exist");
    }

  
    const readStream = createReadStream(inputFullPath);
    const writeStream = createWriteStream(outputFullPath);
    const brotliStream = createBrotliDecompress();

    readStream.pipe(brotliStream).pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
      readStream.on("error", reject);
    });
  } catch (err) {
    throw new Error("Operation failed");
  }
};