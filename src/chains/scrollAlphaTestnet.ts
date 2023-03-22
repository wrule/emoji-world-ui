import { Chain } from 'wagmi';

export
const scrollAlphaTestnet = {
  id: 534353,
  name: 'ScrollAlphaTestnet',
  network: 'ScrollAlphaTestnet',
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
    etherscan: { name: 'ScrollAlphaTestnetScan', url: 'https://blockscout.scroll.io/' },
    default: { name: 'ScrollAlphaTestnetScan', url: 'https://blockscout.scroll.io/' },
  },
} as const satisfies Chain;
