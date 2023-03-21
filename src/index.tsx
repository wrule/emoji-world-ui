import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WagmiConfig, createClient, configureChains, Chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { zkSyncTestnet } from 'wagmi/chains';

export const scroll = {
  id: 534353,
  name: 'Scroll Alpha Testnet',
  network: 'Scroll Alpha Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://alpha-rpc.scroll.io/l2'] },
    default: { http: ['https://alpha-rpc.scroll.io/l2'] },
  },
  blockExplorers: {
    etherscan: { name: 'ScrollScan', url: 'https://blockscout.scroll.io/' },
    default: { name: 'ScrollScan', url: 'https://blockscout.scroll.io/' },
  },
} as const satisfies Chain;


const { provider } = configureChains([scroll], [publicProvider()]);
 
const client = createClient({
  autoConnect: true,
  provider,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
