import fs from 'fs/promises';
import path from 'path';
import process from 'process';

export const rn = async (oldPathArg, newName) => {
  try {
    if (!oldPathArg || !newName) throw new Error();

    const oldPath = path.resolve(process.cwd(), oldPathArg);
    const newPath = path.resolve(path.dirname(oldPath), newName);

    await fs.rename(oldPath, newPath);
  } catch {
    console.error('Operation failed');
  }
};