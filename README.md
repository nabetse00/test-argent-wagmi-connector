# Test Argent Wagmi Custom Connector in Web3Modal

## Introduction

React Project with Web3Modal and WAGMI Custom Wallet Connector from [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector)

This project provides a user-friendly and secure way for users to connect their Argent Wallet to the application directly. 

- The custom wallet connector is here [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector).
- demo page https://nabetse00.github.io/test-argent-wagmi-connector/

## Demo

Web3Modal needs Metamask so install this extension !

Demo site https://nabetse00.github.io/test-argent-wagmi-connector/

![argent-demo](https://user-images.githubusercontent.com/4185026/223785910-99a3cc8f-c1ee-4223-b918-09a86d511409.gif)


## Installation
To install and run this project on your local machine, follow these steps:

Clone the repository to your local machine using the command 
```console
git clone https://github.com/nabetse00/test-argent-wagmi-connector
```

Copy `.env.local.example` to `.env.local`

Change 

```
VITE_WC_PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXXXXx
```

For your WalletConnect porjectId ( see https://cloud.walletconnect.com/sign-in for instructions)

Install the required dependencies using the command 
```
npm install
```
Run the development server using the command 
```
npm run dev
```

## Usage
Once the project is running, you can open it in your browser at 
```
http://localhost:5173/test-argent-wagmi-connector/
``` 

The application allows users to connect their Ethereum wallets to the application using Web3Modal.

## Custom Wallet Connector
The [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector) wagmi custom wallet connector c extends the Connector class provided by Wagmi and implements the necessary methods to connect to the Argent wallet.


# Resources
- [Web3Modal Website](https://web3modal.com/)
- [Web3Modal SDK docs](https://docs.walletconnect.com/2.0/web3modal/about)
- [Wagmi Website](https://wagmi.sh/) 
