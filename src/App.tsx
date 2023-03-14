import ArgentWagmiConnector from "@nabetse/argent-wagmi-connector";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import "./App.css";

import { zkSync, zkSyncTestnet } from "wagmi/chains";

import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import { Profile } from "./components/profile";
import { useEffect } from "react";
import { SignMessage } from "./components/signMessage";
import { SendTransaction } from "./components/sendTransaction";

function App() {
  const projectId = import.meta.env.VITE_WC_PROJECT_ID;
  const chains = [zkSyncTestnet];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId }),
  ]);

  const connector = new ArgentWagmiConnector({
    chains: [zkSyncTestnet],
    options: {
      chainId: zkSyncTestnet.id,
      rpcUrl: zkSyncTestnet.rpcUrls.default.http[0],
      walletConnect: {
        metadata: {
          name: "Cool dapp",
          description: "Description of a cool dapp",
          url: "https://example.com",
          icons: [
            "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a",
          ],
        },
      },
    },
  });

  const wagmiClient = createClient({
    autoConnect: false,
    connectors: [
      connector,
      ...modalConnectors({
        version: "2",
        appName: "web3Modal",
        chains: chains,
        projectId,
      }),
    ],
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);
  function removeApplicationData() {
    if (window) {
      localStorage.clear();
    }
  }

  useEffect(() => {
    removeApplicationData();
  }, []);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div className="App">
          <Web3Button />
        </div>
        <Profile />

        <br />

        <SignMessage />
        <br />
        <SendTransaction />

        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          enableAccountView={true}
          enableNetworkView={true}
          themeMode="light"
          walletImages={{
            argentWallet: "/test-argent-wagmi-connector/wallet_argent.svg",
          }}
        />
      </WagmiConfig>
    </>
  );
}

export default App;
