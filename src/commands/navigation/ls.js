import fs from 'fs/promises';
import path from 'path';
import process from 'process';

export const ls = async () => {
  try {
    const currentDir = process.cwd();
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    const result = items.map((item, index) => ({
      // index,
      Name: item.name,
      Type: item.isDirectory() ? 'directory' : 'file',
    }));

    console.table(result);
  } catch {
    console.error('Operation failed');
  }
};