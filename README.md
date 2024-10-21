# Attributes Verification on Hedera

Verify user attributes provided by ShareRing on the Hedera network. 

## Prerequisites

- Node.js v22.18.0 or later
- [pnpm](https://pnpm.io/) package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd attributes-verification-hedera
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Environment Variables

Create a `.env` file in the root directory and set the environment variables. You can use the `.env.sample` file as a template.


## Usage

To verify attributes, run the following command:

```bash
pnpm verify
```

This will execute the `verify.js` script, which verifies the attributes and prints the result to the console.
