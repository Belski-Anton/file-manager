import process from 'process';
import path from 'path';
import fs from 'fs/promises';

export const cd = async (targetPath) => {
  try {
    const resolvedPath = path.isAbsolute(targetPath)
      ? targetPath
      : path.resolve(process.cwd(), targetPath);

    const stats = await fs.stat(resolvedPath);
    if (!stats.isDirectory()) throw new Error();

    process.chdir(resolvedPath);
  } catch {
    console.error('Operation failed');
  }
};