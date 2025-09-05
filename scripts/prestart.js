#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, readFile, writeFile, stat } from 'fs/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function findFiles(dir) {
  const files = [];

  try {
    const entries = await readdir(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        const subFiles = await findFiles(fullPath);
        files.push(...subFiles);
      } else if (stats.isFile()) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return files;
}

async function replaceInFile(filePath, searchText, replaceText) {
  try {
    const content = await readFile(filePath, 'utf8');

    if (content.includes(searchText)) {
      const newContent = content.replace(
        new RegExp(searchText, 'g'),
        replaceText,
      );
      await writeFile(filePath, newContent, 'utf8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  const projectRoot = join(__dirname, '..');
  const distPath = join(projectRoot, 'dist');

  console.info('Starting prestart script...');
  console.info(`Searching for files in: ${distPath}`);

  try {
    const files = await findFiles(distPath);
    console.info(`Found ${files.length} files to process`);

    let modifiedCount = 0;

    for (const file of files) {
      const wasModified = await replaceInFile(
        file,
        '/@BASENAME@',
        process.env.BASE_PATH ?? '',
      );
      if (wasModified) {
        modifiedCount++;
        console.info(`Modified: ${file}`);
      }
    }

    console.info(`Prestart complete. Modified ${modifiedCount} files.`);
  } catch (error) {
    console.error('Error during prestart:', error.message);
    process.exit(1);
  }
}

main();
