# Test Argent Wagmi Custom Connector in Web3Modal

## Introduction

React Project with Web3Modal and WAGMI Custom Wallet Connector from [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector)

This project provides a user-friendly and secure way for users to connect their Argent Wallet to the application directly. 

- The custom wallet connector is here [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector).
- demo page https://nabetse00.github.io/test-argent-wagmi-connector/

## Demos

Web3Modal needs Metamask so install this extension !

Demo site https://nabetse00.github.io/test-argent-wagmi-connector/

![argent-demo](https://user-images.githubusercontent.com/4185026/223785910-99a3cc8f-c1ee-4223-b918-09a86d511409.gif)

[Argent Message Signing Demo](https://www.youtube.com/watch?v=WRBVmZuJ6rI)

## Installation
To install and run this project on your local machine, follow these steps:

Clone the repository to your local machine using the command 
```console
git clone https://github.com/nabetse00/test-argent-wagmi-connector
```

Copy `.env.local.example` to `.env.local`

Change WalletConnect porjectId:

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

Once the project is running, you can open it in your browser at 
```
http://localhost:5173/test-argent-wagmi-connector/
``` 

The application allows users to connect their Ethereum wallets to the application using Web3Modal.

## Usage

To use [argent-wagmi-connector](https://github.com/nabetse00/) in your project:

1. Install via npm
```
npm i @nabetse/argent-wagmi-connector
```

2. configure Argent custom connector options for example:
``` ts 
  const connector = new ArgentWagmiConnector({
    chains: [zkSyncTestnet],
    options: {
      chainId: 280,
      rpcUrl: "https://zksync2-testnet.zksync.dev",
      walletConnect: {
        metadata: {
          name: "Cool dapp",
          description: "Description of a cool dapp",
          url: "https://example.com",
          icons: ["icon url here"]
        }
      }
    }
  })
```

3. Add it to wagmi client allong with web3modal
```ts
  const wagmiClient = createClient({
    autoConnect: false,
    connectors: [
      connector,
      ...modalConnectors(
        { version: '2', appName: 'web3Modal', chains: chains, projectId, }
      ),
    ],
    provider
  })
```
Note that before you must configure chains and walletConnectProdider.
projectId is obteined from WalletConnect [here](https://cloud.walletconnect.com/sign-in) this is now mandatory for web3modal.

```ts
const chains = [zkSync, zkSyncTestnet];

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
```

Also remember web3modal needs Metamask extension to work so install it from [here](https://metamask.io/download/)

## Custom Wallet Connector
The [argent-wagmi-connector](https://github.com/nabetse00/argent-wagmi-connector) wagmi custom wallet connector extends the Connector class provided by Wagmi and implements the necessary methods to connect to the Argent wallet.

npm here package is here: https://www.npmjs.com/package/@nabetse/argent-wagmi-connector


# Resources
- [Web3Modal Website](https://web3modal.com/)
- [Web3Modal SDK docs](https://docs.walletconnect.com/2.0/web3modal/about)
- [Wagmi Website](https://wagmi.sh/) 

# videos

DEMO 1: Simple Argent Login

https://user-images.githubusercontent.com/4185026/223789984-ac7d3210-99ae-417d-bcba-0859de138dd8.mp4

DEMO 2: Argent Login and message signing

https://www.youtube.com/watch?v=WRBVmZuJ6rI







