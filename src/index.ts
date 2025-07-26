import fs from 'fs'
import * as dotenv from 'dotenv';
import { chunkText, embedDocumentChunks, parseFile } from './lib/index-builder';
import path from 'path';

// Entry point for your TypeScript project
dotenv.config({ debug: false, quiet: true });

const ollamaHost = process.env.OLLAMA_ORIGIN;
console.log('OLLAMA_ORIGIN:', ollamaHost);

async function main() {
  const filepath = process.argv[2]

  if (!filepath) {
    console.error('❌ Please provide a file path: `node dist/index.js ./path/to/commits.txt`')
    return
  }

  const validatedFilepath = filepath.replaceAll('^', '')
  console.log('📄 Parsing file…', validatedFilepath)
  const rawText = await parseFile(validatedFilepath)

  console.log('✂️ Chunking text…')
  const chunks = chunkText(rawText)

  console.log('🧠 Generating embeddings…')
  const embedded = await embedDocumentChunks(chunks)

  console.log('💾 Saving index…')
  const indexFilepath = 'data/index.json'
  const dir = path.dirname(indexFilepath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(indexFilepath, JSON.stringify(embedded, null, 2))

  console.log('✅ Index saved…')
}

main().catch(console.error)