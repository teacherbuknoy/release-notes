import fs from 'fs'
import * as dotenv from 'dotenv';
import { chunkText, embedDocumentChunks, parseFile } from './lib/index-builder';
import path from 'path';
import { generateChangeLog } from './lib/rag-parser';

// Entry point for your TypeScript project
dotenv.config({ debug: false, quiet: true });

const ollamaHost = process.env.OLLAMA_ORIGIN;
console.log('🖥️  Ollama running at', ollamaHost);

async function main() {
  const filepath = process.argv[2]

  if (!filepath) {
    console.error('❌ Please provide a file path: `node dist/index.js ./path/to/commits.txt`')
    return
  }

  const validatedFilepath = filepath.replaceAll('^', '')
  console.log('📄 Parsing commits file…', validatedFilepath)
  const rawText = await parseFile(validatedFilepath)

  console.log('✅ Index saved…')

  console.log('🎡 Generating changelog…')
  const changelog = await generateChangeLog(rawText)
  console.log('✅ Changelog saved as', changelog.file)
}

main().catch(console.error)