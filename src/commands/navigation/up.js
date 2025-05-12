import os from "os";
import path from "path";
import process from "process";

export const up = () => {
  try {
    const currentDir = process.cwd();
    const homeDir = os.homedir();

    const parentDir = path.resolve(currentDir, "..");

    if (path.relative(homeDir, parentDir).startsWith("..")) {
      return;
    }

    process.chdir(parentDir);
  } catch {
    console.error("Operation failed");
  }
};
