import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'
   
  export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    // const { disconnect } = useDisconnect()
   
    if (isConnected) {
      return (
        <div>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name}</div>
        </div>
      )
    }
   
    return (
      <div>
        User not connected 
      </div>
    )
  }