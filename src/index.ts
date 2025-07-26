import * as dotenv from 'dotenv';

// Entry point for your TypeScript project
dotenv.config({ debug: false, quiet: true });

const ollamaHost = process.env.OLLAMA_ORIGIN;
console.log('OLLAMA_ORIGIN:', ollamaHost);