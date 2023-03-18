import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Popover, message } from 'antd';
import { useEffect } from 'react';

export
function Connector() {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (address) {
      message.success('Successfully connected');
    } else {
      message.info('Disconnected');
    }
  }, [address]);

  if (address) {
    return <Popover
      placement="bottom"
      title="Connected address"
      content={<span>{address}</span>}>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Popover>;
  }
  return <Button type="primary" onClick={() => connect()}>Connect Wallet</Button>;
}
