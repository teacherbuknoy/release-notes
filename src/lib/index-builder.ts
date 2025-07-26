import path from 'path'
import { openTextFile } from './rag-parser'
import * as dotenv from 'dotenv'

dotenv.config({ quiet: true })

export async function parseFile(filePath: string): Promise<string> {
  const ext = path.extname(filePath).toLocaleLowerCase()
  return await openTextFile(filePath);/* 
  switch (ext.trim()) {
    case '.txt':
    default:
      throw new Error('Unsupported filetype: ' + ext)
  } */
}


/**
 * Splits a given text into chunks of sentences, ensuring each chunk does not exceed the specified maximum size.
 *
 * The function separates the text into sentences using double newlines or punctuation followed by whitespace,
 * then groups sentences into chunks whose combined length is less than or equal to `maxChunkSize`.
 *
 * @param text - The input text to be chunked.
 * @param maxChunkSize - The maximum allowed length for each chunk. Defaults to 500.
 * @returns An array of text chunks, each containing one or more sentences.
 */
export function chunkText(text: string, maxChunkSize: number = 500): string[] {
  const sentences = text.split(/\n{2,}|(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length > maxChunkSize) {
      if (current)
        chunks.push(current.trim())

      current = sentence
    } else {
      current += ' ' + sentence
    }
  }

  if (current)
    chunks.push(current.trim())

  return chunks
}

export interface NomicTextEmbedding {
  embedding: number[]
}

/**
 * Retrieves the embedding vector for a given text using the 'nomic-embed-text' model via the Ollama API.
 *
 * @param text - The input text to generate an embedding for.
 * @returns A promise that resolves to an array of numbers representing the embedding vector.
 * @throws If the embedding could not be retrieved from the API response.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  const res = await fetch(process.env.OLLAMA_ORIGIN + '/api/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'nomic-embed-text',
      prompt: text
    })
  })

  const json: NomicTextEmbedding = await res.json()

  if (!json.embedding) {
    throw new Error(`Failed to get embedding: ${JSON.stringify(json)}`)
  }

  return json.embedding
}

/**
 * Embeds an array of document chunks by generating vector representations for each chunk.
 *
 * Iterates over the provided `chunks`, logs the first 50 characters of each chunk,
 * and uses the `getEmbedding` function to obtain a vector embedding for each chunk.
 * Returns an array of objects containing the original chunk and its corresponding vector.
 *
 * @param chunks - An array of strings, each representing a document chunk to be embedded.
 * @returns A promise that resolves to an array of objects, each containing a `chunk` and its `vector` embedding.
 */
export async function embedDocumentChunks(chunks: string[]) {
  const allEmbeddings = []

  let index = 1
  for (const chunk of chunks) {
    console.log(`\tEmbedding chunk (${index}/${chunks.length}, ${chunk.length} chars): ${chunk.substring(0, 50)}`)
    const vector = await getEmbedding(chunk)
    allEmbeddings.push({ chunk, vector })

    index++
  }

  return allEmbeddings
}