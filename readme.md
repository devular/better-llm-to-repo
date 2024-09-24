# Better Repo to LLM

Better Repo to LLM is a powerful command-line tool that converts Git repositories into an LLM-friendly format. It clones a repository, processes its files, and outputs a single text file containing the repository's contents in a structured XML format. The tool respects .gitignore rules, handles various file types, and provides options for customization, making it ideal for preparing codebases for analysis by Large Language Models (LLMs).

## Features

- Clones Git repositories (HTTPS or SSH)
- Respects .gitignore rules and additional custom exclusion patterns
- Supports a wide range of file extensions including JavaScript, TypeScript, Python, Ruby, PHP, C/C++, Java, C#, Go, Swift, Kotlin, Rust, and more
- Optional minification for code files
- Exclusion of files based on custom patterns and file size
- Token estimation for LLM processing
- Debug mode for detailed logging
- Structured XML output format with file metadata

## Installation

You can use this tool without installation via `npx`. Simply run the command with the appropriate arguments as shown in the examples below.

## Usage

The basic usage of the tool is as follows:

```bash
npx better-repo-to-llm <gitUrl> [options]
```

Replace `<gitUrl>` with the HTTPS or SSH URL of the Git repository you want to process.

### Options

#### `--exclude <patterns...>`

Specify additional patterns to exclude files or directories from processing. This option can be used multiple times or with space-separated patterns.

Example:

```bash
npx better-repo-to-llm https://github.com/user/repo.git --exclude "*.test.js" "docs/*"
```

This will exclude all files ending with `.test.js` and everything in the `docs` directory.

#### `--minify`

Enable minification of code files by removing extra whitespace and newlines. This option helps reduce the token count for LLM processing.

Example:

```bash
npx better-repo-to-llm https://github.com/user/repo.git --minify
```

#### `--max-lines <number>`

Specify the maximum number of lines allowed per file. Files exceeding this limit will be excluded from processing. If not specified, the default is 800 lines.

Example:

```bash
npx better-repo-to-llm https://github.com/user/repo.git --max-lines 1000
```

This will set the maximum number of lines per file to 1000, allowing larger files to be included in the output.

#### Debug Mode

To enable debug mode for detailed logging, set the `DEBUG` environment variable to `true`:

```bash
DEBUG=true npx better-repo-to-llm https://github.com/user/repo.git
```

This will provide verbose output, including information about which files are being processed, ignored, or excluded.

## Output

The tool generates a single text file containing the processed repository contents. The output file is named using a slugified version of the repository name (e.g., `my-awesome-repo.txt`).

Each file in the output is wrapped in XML tags with metadata:

```xml
<File name="filename.ext" path="path/to/file" size="1234" tokens="5678">
File contents here...
</File>
```

The metadata includes:

- `name`: The file name
- `path`: The relative path of the file in the repository
- `size`: The file size in bytes
- `tokens`: An estimate of the number of tokens in the file content

## File Processing

- The tool respects `.gitignore` rules and additional specified exclusions.
- Files larger than the specified maximum number of lines (default 800) are automatically excluded to prevent oversized outputs.
- Non-text files and files with unsupported extensions are skipped.
- If minification is enabled, most code files will have extra whitespace removed.

## Token Estimation

The tool provides an estimate of the total number of tokens in the output, which is useful for planning LLM API usage. This estimation uses the GPT-3 tokenizer, which may not be exact for all LLM models but provides a good approximation.

## Limitations

- The tool is designed for text-based files and may not handle binary files appropriately.
- Very large repositories may take a significant amount of time to process.
- The maximum number of lines per file can be adjusted using the `--max-lines` option.

## Contributing

Contributions to Better Repo to LLM are welcome! Please feel free to submit issues, feature requests, or pull requests on the GitHub repository.
