# Airtable Interface Extension Setup Log

_Date logged: 2026-03-28_

This document is a README companion log for the Airtable Interface Extension bootstrap work connected to this repository.

## Reference links

- Repository: https://github.com/espacios-me/atom-app
- Airtable setup URL: https://airtable.com/create/extensions/blkFl2j0UlN09sfiR/setup
- Airtable template repo: https://github.com/Airtable/interface-extensions-hello-world

## Logged command sequence

The following sequence is preserved as provided, with no command omissions.

```bash
npm install -g @airtable/blocks-cli
block set-api-key
block init NONE/blkFl2j0UlN09sfiR --template=https://github.com/Airtable/interface-extensions-hello-world espacios_me_bot
cd espacios_me_bot
cd espacios_me_bot
block run
block release
```

## Command comments

### 1) Install the Airtable Blocks CLI

```bash
npm install -g @airtable/blocks-cli
```

Comment:
- Installs the Airtable CLI globally so the `block` command is available in the terminal.

### 2) Authenticate the CLI

```bash
block set-api-key
```

Comment:
- Prompts for the Airtable API key locally.
- This should be entered in the terminal only and should not be committed into the repository.

### 3) Initialize the extension project

```bash
block init NONE/blkFl2j0UlN09sfiR --template=https://github.com/Airtable/interface-extensions-hello-world espacios_me_bot
```

Comment:
- Initializes a new Airtable Interface Extension project named `espacios_me_bot`.
- Uses the Airtable block ID `blkFl2j0UlN09sfiR`.
- Uses the `interface-extensions-hello-world` template as the starting point.
- The `NONE/blkFl2j0UlN09sfiR` segment is preserved exactly as captured in the original setup note.

### 4) Enter the project directory

```bash
cd espacios_me_bot
```

Comment:
- Changes into the generated project folder.

### 5) Enter the project directory again

```bash
cd espacios_me_bot
```

Comment:
- Preserved exactly as originally logged.
- This appears to be a duplicated command in the captured setup sequence, but it is intentionally not omitted here.

### 6) Run the extension locally

```bash
block run
```

Comment:
- Starts the local development server for the Airtable extension.
- Used for testing the extension during development.

### 7) Release the extension

```bash
block release
```

Comment:
- Publishes the extension build after local verification.

## Captured setup notes

- Secret label provided in setup note: `mahershalalhasbadsh`
- Username provided in setup note: `mahershalalhasbadsh`
- API key / PAT provided in setup note: redacted from repository for security

## Security note

Credentials and API keys must not be committed to a public repository.
The secret and PAT shared in the setup note were intentionally redacted from this file.
They should be rotated before production use if they were exposed outside a secure secret manager.

## Suggested README placement

This log is intended to support the main README with a dated implementation record for the Airtable Interface Extension setup.
A short link to this file can be added to `README.md` in a later follow-up edit.
