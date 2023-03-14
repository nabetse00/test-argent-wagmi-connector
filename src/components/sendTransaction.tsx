import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useSignMessage,
  useWaitForTransaction,
} from "wagmi";

import { useState } from "react";

import { useDebounce } from "use-debounce";
import { utils } from "ethers";
import { useBalance } from "wagmi";

export function SendTransaction() {
  const { address, isConnected } = useAccount();
  const [reciever, setReciever] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string>();
  const [debouncedReciever] = useDebounce(reciever, 500);
  const [debouncedAmount] = useDebounce(amount, 500);

  const balance = useBalance({
    address: address,
  });

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedReciever,
      value: debouncedAmount ? utils.parseEther(debouncedAmount) : undefined,
    },
    onError(err) {
      setError(err.message);
    },
    onSuccess(_data) {
      setError(undefined);
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function isFloat(val: string) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val)) return false;

    const val_ = parseFloat(val);
    if (isNaN(val_)) return false;
    return true;
  }

  return (
    <>
      {isConnected && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendTransaction?.();
          }}
        >
          <label htmlFor="message"> Receiver:</label>
          <input
            aria-label="Reciever"
            onChange={(e) => setReciever(e.target.value)}
            placeholder="0xA0Cf…251e"
            value={reciever}
          />
          <label htmlFor="message"> Amount in Ethers:</label>
          <input
            aria-label="Amount (ether)"
            onChange={(e) => {
              if (isFloat(e.target.value)) {
                setAmount(e.target.value);
              }
            }}
            placeholder="0.05 ETH"
            value={amount}
          />
          <button
            disabled={isLoading || !sendTransaction || !reciever || !amount}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>

          {error && (
            <>
              <div style={{ color: "red" }}>{error}</div>
            </>
          )}
          {isSuccess && (
            <div>
              Successfully sent {amount} ether to {reciever}
              <div>
                <a href={`https://zksync2-testnet.zkscan.io/tx/${data?.hash}`}>
                  zkscan.io
                </a>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
}
