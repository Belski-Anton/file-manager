import fs from "fs/promises";
import path from "path";
import process from "process";

export const mkdir = async (dirName) => {
  try {
    if (!dirName) throw new Error();

    const fullPath = path.resolve(process.cwd(), dirName);
    await fs.mkdir(fullPath, { recursive: false });
  } catch {
    console.error("Operation failed");
  }
};
