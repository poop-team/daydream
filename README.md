# Big 💩 Project  —  **`Monorepo`**

## Description
This is a monorepo using [Turborepo](https://turborepo.org) and yarn workspaces.

## Getting Started
This whole monorepo thing might seem daunting at first, but hopefully it'll get clearer once you've read everything below.

### Structure
The general hierarchy of the project is as follows:
```
.
├── node_modules (Dependencies for all apps)
├── apps         (All apps)
│   ├── web      (The web app and api, built with Next.js)
│   └── mobile   (The mobile app, built with React Native)
├── packages     (Packages that are shared between apps)
│   ├── config   (Shared configuration)
│   ├── tsconfig (Shared TypeScript configuration)
│   └── ui       (Shared UI components library)
├── .nvmrc       (Stores the version used by nvm)
├── package.json (The root package.json containing the workspace configuration)
└── turbo.json   (The configuration for turborepo)
```

### Prerequisites
1. Download and install **Node Version Manager** > ([Windows](https://github.com/coreybutler/nvm-windows) | [macOS/Linux](https://github.com/nvm-sh/nvm))
2. Install and run the latest node version by running `nvm install latest && nvm use latest` in the terminal
3. Install **Yarn** by running `npm install -g yarn`
4. Ensure you are in the directory for the project and run `yarn` to install all dependencies

### Starting the web app in a development environment
1. Ensure you are in the directory for the web app `cd apps/web` and run `yarn dev` to boot it up
2. The app should now be running at `http://localhost:3000`

### Starting the mobile app in a development environment
(Soon™)

### Starting Storybook for UI component development
1. Ensure you are in the directory for the ui component library `cd packages/ui` and run `yarn storybook`
2. Storybook should now be running at `http://localhost:6006`

### Committing changes
1. Ensure there are no errors by running `yarn lint` and `yarn test` in the respective app's directory
2. Commit your changes using `git commit -m "<type>[scope]: <description>"` (Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)) and push them to the remote repository using `git push`
