# Proyect: Switch Control - Module Switch Master Control Client

This project is a very easy demonstration of how to store a piece of information in the blockchain that can be consumed by others. This project will implement a system that could control 8 switches to swith on/off up to 8 devices over the internet.

This is the front-end client module, that periodically will read the blockchain state and switch off / on every switch accordingly to that state.

# Test link

You can view the program working in this link. The screen will show / update every few seconds the switches states store in the blockchain. As soon as this states are changed and uptated in the blockchain, they will be updated here.

https://switch-master-control-client.vercel.app/

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation and test

    Clone this repository
        git clone <repository-url>
    cd switch-master-control-client
    yarn
    yarn dev or npm run dev