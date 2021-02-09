### STRONG TYPE NEXTJS

### INIT

- `npm i react react-dom next`
- `touch tsconfig.json`
- `npm i --save-dev typescript`
- `npm i --save-dev @types/react @types/react-dom @types/node`
- `mkdir pages` 
- `npm i -D graphql-let @graphql-codegen/cli @graphql-codegen/plugin-helpers @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo yaml-loader`
- `npm i @apollo/client graphql`
- `npx graphql-let init`

#### Custom Script (package.json)

```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
```

### RUN COMMAND

- `npm run dev`

#### SAMPLE CONSOLE

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
We detected TypeScript in your project and created a tsconfig.json file for you.

event - compiled successfully

```

#### SAMPLE `tsconfig.json`

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": "."
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```
