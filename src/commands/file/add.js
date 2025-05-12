import fs from "fs/promises";
import path from "path";
import process from "process";

export const add = async (fileName) => {
  try {
    const filePath = path.resolve(process.cwd(), fileName);
    await fs.writeFile(filePath, "", { flag: "wx" }); 
  } catch {
    console.error("Operation failed");
  }
};
