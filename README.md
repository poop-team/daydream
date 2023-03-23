<p align="center">
 <img src="https://github.com/poop-team/daydream/blob/main/mobile/src/images/daydream_logo_words.png" 
   width="320"
   height="320"
 />
</p>

# [Daydream](https://daydream.wtf)  —  **`Monorepo`**
<img src='https://i.imgur.com/ZvNFMHR.png' title='Daydream' width='full' alt='Daydream - AI image generation and sharing app' />

## Description
AI image generation and sharing app. This monorepo contains the mobile and web apps.

## Getting Started
### Prerequisites
1. Download and install **Node Version Manager** > ([Windows](https://github.com/coreybutler/nvm-windows) | [macOS/Linux](https://github.com/nvm-sh/nvm))
2. Install and run the latest node version by running `nvm install 18 && nvm use 18` in the terminal
3. Install **Yarn** by running `npm install -g yarn`
4. Go to the directory of the project you'll be working in and run `yarn` to install all dependencies

### Starting the web app in a development environment
1. Ensure you are in the directory for the web app `cd ./web` and run `yarn dev` to boot it up
2. The app should now be running at `http://localhost:3000`

### Committing changes
1. Ensure there are no errors by running `yarn lint` and `yarn test` in the respective app's directory
2. Commit your changes using `git commit -m "<type>[scope]: <description>"` (Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)) and push them to the remote repository using `git push`
