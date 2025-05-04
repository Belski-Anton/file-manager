import fs from "fs/promises";
import path from "path";
import process from "process";

export const rm = async (filePath) => {
  try {
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    await fs.unlink(resolvedPath);
  } catch {
    throw new Error("Operation failed");
  }
};
