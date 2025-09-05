#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, readFile, writeFile, stat } from 'fs/promises';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Recursively find all files in a directory
 * @param {string} dir - Directory to search
 * @returns {Promise<string[]>} Array of file paths
 */
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

/**
 * Replace text in a file
 * @param {string} filePath - Path to the file
 * @param {string} searchText - Text to search for
 * @param {string} replaceText - Text to replace with
 * @returns {Promise<boolean>} True if file was modified
 */
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

/**
 * Main function to replace @BASENAME@ with process.env.BASE_PATH in dist/server files
 */
async function main() {
  const projectRoot = join(__dirname, '..');
  const distServerPath = join(projectRoot, 'dist', 'server');

  console.info('Starting postbuild script...');
  console.info(`Searching for files in: ${distServerPath}`);

  try {
    const files = await findFiles(distServerPath);
    console.info(`Found ${files.length} files to process`);

    let modifiedCount = 0;

    for (const file of files) {
      const wasModified = await replaceInFile(
        file,
        '"@BASENAME@"',
        'process.env.BASE_PATH',
      );
      if (wasModified) {
        modifiedCount++;
        console.info(`Modified: ${file}`);
      }
    }

    console.info(`Postbuild complete. Modified ${modifiedCount} files.`);
  } catch (error) {
    console.error('Error during postbuild:', error.message);
    process.exit(1);
  }
}

main();
