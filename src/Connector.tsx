import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Popover, message } from 'antd';
import { useEffect } from 'react';

export
function Connector() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect: () => {
      message.success('Connected');
    },
    onDisconnect: () => {
      message.error('Disconnected');
    },
  });
  if (isConnecting) return <Button>Connecting...</Button>;
  if (isDisconnected) return <Button onClick={() => disconnect()}>{address}</Button>;
  return <Button type="primary" onClick={() => connect()}>Connect</Button>;
}
