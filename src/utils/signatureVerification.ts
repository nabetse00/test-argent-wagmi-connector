import { getEthereumProvider, IArgentLoginOptions } from "@argent/login";
import { zkSyncTestnet } from "wagmi/chains";
import { utils, Web3Provider } from "zksync-web3";

const options: IArgentLoginOptions = {
  chainId: zkSyncTestnet.id,
  rpcUrl: zkSyncTestnet.rpcUrls.default.http[0],
  walletConnect: {
    metadata: {
      name: "Test app init",
      description: "Description of test app init",
      url: "https://example.com",
      icons: [
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a",
      ],
    },
  },
};

/**
 * EIP-1271 signature validation helper function
 *
 */
export async function verifySignature(
  address?: string,
  message?: string | Uint8Array,
  signatureData?: string
): Promise<boolean> {
  const providerEth = await getEthereumProvider(options);
  const provider = new Web3Provider(providerEth);
  let result = false;
  if (address && message && signatureData) {
    result = await utils.isMessageSignatureCorrect(
      provider,
      address.toString(),
      message,
      signatureData
    );
  }

  return result;
}
