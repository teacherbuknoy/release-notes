import fs from 'fs'
import * as dotenv from 'dotenv'
import MarkdownIt from 'markdown-it'
const terminal = require('markdown-it-terminal')

dotenv.config({ quiet: true })

function markdownToCli(markdownString: string) {
  const markdown = MarkdownIt().use(terminal)
  return markdown.render(markdownString, {})
}

export async function openTextFile(path: fs.PathOrFileDescriptor): Promise<string> {
  const data = fs.readFileSync(path, { encoding: 'utf-8' })

  return data
}

export async function generateChangeLog(commits: string) {
  const changelogPrompt = await openTextFile('prompt.md')
  const host = process.env.OLLAMA_ORIGIN as string
  const prompt = `${changelogPrompt}\n\n${commits}`
  
  const response = await fetch(`${host}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'codellama:7b',
      prompt,
      stream: true
    })
  })

  const filepath = 'result-changelog.md'
  const stream = 'result-stream.md'
  const fileStream = fs.createWriteStream(filepath)
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let markdown = ''

  fs.writeFileSync(stream, '')
  console.log(markdownToCli(prompt))
  while (true) {
    const { done, value } = (await reader?.read()) ?? { done: true, value: undefined }
    if (done) break
    const chunk = decoder.decode(value)
    markdown += chunk
    //fileStream.write(chunk)
    
    try {
      const chunkText = JSON.parse(chunk).response
      fs.appendFileSync(stream, chunkText)
    } catch (e) {
      console.error('ERROR', chunk)
      throw e
    }
  }
  fileStream.end()

  return { 
    prompt: changelogPrompt,
    response: markdown,
    markdown,
    file: stream
  }
}