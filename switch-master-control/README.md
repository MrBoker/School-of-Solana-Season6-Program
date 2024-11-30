# Proyect: Switch Control - Module Switch Master Control

This project is a very easy demonstration of how to store a piece of information in the blockchain that can be consumed by others. This project will implement a system that could control 8 switches to swith on/off up to 8 devices over the internet.

This is the front-end Master Control module, that let the user manipulate all the 8 switches and then store the new value in the blockchain using the back-eng logic.

# Test link

You can view the program working in this link. You can change the state of every switch and update (push button) that state in the blockchain. You need a wallet configured in Devnet. Once updated, these switches states is propagated to the client side.

https://switch-master-control-v2.vercel.app/

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation and test

    Clone this repository
        git clone <repository-url>
    cd switch-master-control
    yarn
    yarn dev or npm run dev
