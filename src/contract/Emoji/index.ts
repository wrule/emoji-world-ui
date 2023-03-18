import { ethers } from 'ethers';
import Interface from './interface.json';

export
class Emoji extends ethers.Contract {
  constructor(signerOrProvider?: ethers.Signer | ethers.providers.Provider | undefined) {
    super('0x70C38C4279ca77020CB0551465d0783011D869ca', Interface.abi, signerOrProvider);
  }
}
