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

export type ChangelogOptions = {
  commits: string
  model: string
  host: string
  promptFile: fs.PathOrFileDescriptor
  outfile: fs.PathOrFileDescriptor
}

export async function generateChangeLog(options: ChangelogOptions) {
  const { commits, host, model, promptFile, outfile } = options
  
  const changelogPrompt = await openTextFile(promptFile)
  const prompt = `${changelogPrompt}\n\n${commits}`
  
  const response = await fetch(`${host}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: true
    })
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  let markdown = ''

  fs.writeFileSync(outfile, '')
  //console.log(markdownToCli(prompt))
  while (true) {
    const { done, value } = (await reader?.read()) ?? { done: true, value: undefined }
    if (done) break
    const chunk = decoder.decode(value)
    markdown += chunk
    
    try {
      const chunkText = JSON.parse(chunk).response
      fs.appendFileSync(outfile, chunkText)
    } catch (e) {
      console.error('ERROR', chunk)
      throw e
    }
  }

  return { 
    prompt: changelogPrompt,
    response: markdown,
    markdown,
    file: outfile
  }
}