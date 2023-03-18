import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Popover, message } from 'antd';
import { useEffect } from 'react';

export
function Balance(props: { address: string }) {
  const { data, isError, isLoading } = useBalance({ address: props.address as any });
  if (isLoading) return <span>Fetching balance...</span>;
  if (isError) return <span>Error fetching balance</span>;
  return <span>{data?.formatted} {data?.symbol}</span>;
}

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
      content={<div>
        <div>{address}</div>
        <div><Balance address={address} /></div>
      </div>}>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Popover>;
  }
  return <Button type="primary" onClick={() => connect()}>Connect Wallet</Button>;
}
