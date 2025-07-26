import fs from 'fs'

export async function openTextFile(path: fs.PathOrFileDescriptor): Promise<string> {
  const data = fs.readFileSync(path, { encoding: 'utf-8' })

  return data
}

export async function generateChangeLog() {
  const changelogPrompt = openTextFile('prompt.md')
  
}