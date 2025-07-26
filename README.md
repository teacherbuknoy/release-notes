# release-notes
A tool to feed your commits into Ollama and generate a changelog/release note.

## Features
- Generate changelogs from commit files
- Uses Ollama API for LLM-powered summaries
- Supports streaming responses

## Installation
```sh
# Install dependencies
npm install
```

## Usage
```sh
# Build the project
npm run build

# Run with a commit file
node dist/index.js "<path-to-commits.txt>"

# or...
npm start "<path-to-commits.txt>"
```

## Installing Ollama
1. Download and install [Ollama](https://ollama.com/) for your OS (Windows, macOS, or Linux).
2. Follow the official installation instructions on the Ollama website.
3. After installation, start the Ollama server:
   ```sh
   ollama serve
   ```
4. Verify Ollama is running by visiting `http://127.0.0.1:11434` in your browser or using:
   ```sh
   curl http://127.0.0.1:11434
   ```
5. Pull your desired model (example):
   ```sh
   ollama pull deepcoder:1.5b
   ```
6. Copy `.env.example` to `.env` and fill in your values:
   - `OLLAMA_ORIGIN` - Ollama API URL (e.g., `http://127.0.0.1:11434`)
   - `OLLAMA_MODEL` - Model name (e.g., `deepcoder:1.5b`)
   - `PROMPT_FILE` - Path to your prompt file (e.g., `prompt.md`)

## API Reference
- See `src/lib/rag-parser.ts` for API usage and streaming support.

## Contributing
- Fork the repo
- Create a feature branch
- Submit a pull request

## License
[MIT](LICENSE)

## TODO
- [ ] Add more command line options
- [ ] Add a web UI for easier generation

