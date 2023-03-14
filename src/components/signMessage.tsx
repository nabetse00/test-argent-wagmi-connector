import { useAccount, useSignMessage } from "wagmi";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { verifySignature } from "../utils/signatureVerification";

export function SignMessage() {
  const recoveredAddress = useRef<string>();
  const { address, isConnected } = useAccount();
  const [message, setMessage] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [isValidSign, setIsValidSign] = useState(false);
  const { data, error, isLoading, signMessage } = useSignMessage({
    async onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      let result = await verifySignature(address, variables.message, data);
      if (result) {
        recoveredAddress.current = address;
        console.log("signature is valid!");
      } else {
        console.error(`invalid signature: ${data}`);
      }
      setIsValidSign(result);
      setIsSigning(false);
    },
  });

  function handleSubmit(event: FormEvent) {
    setIsSigning(true);
    //alert(`Message submited was: '${message}'. Please check your phone to approve signature` )
    signMessage({ message });
    event.preventDefault();
    setTimeout(() => {
      console.log("signing timeout !");
      setIsSigning(false);
    }, 1000);
  }

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(event.target.value);
  }

  return (
    <>
      {isConnected && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="message"> Enter a message to sign</label>
          <textarea
            id="message"
            name="message"
            placeholder="The quick brown fox…"
            value={message}
            onChange={handleChange}
          />
          <button disabled={isSigning}>
            {isSigning ? "Check Your Phone!" : "Sign Message"}
          </button>

          {data && (
            <>
              {isValidSign ? (
                <label>👌Signature is OK!👌</label>
              ) : (
                <label>💀Signature failed 💀</label>
              )}
              <label>Recovered Address: {recoveredAddress.current}</label>
              <label>
                Signature: {data.slice(1, 20)}...{data.slice(-20)}
              </label>
            </>
          )}

          {error && <div>{error.message}</div>}
        </form>
      )}
    </>
  );
}
