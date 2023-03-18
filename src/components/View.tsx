import React, { useEffect, useState } from 'react';
import { Emoji, INFT } from './Emoji';
import style from './View.module.scss';
import { useContract, useContractRead } from 'wagmi';
import EmojiInterface from '../contract/Emoji/interface.json';

const EmojiContract = {
  address: '0x70C38C4279ca77020CB0551465d0783011D869ca',
  abi: EmojiInterface.abi,
};

export
function View() {
  const [focus, setFocus] = useState<[number, number]>([0, 0]);

  const moveUp = () => setFocus([focus[0], focus[1] - 1]);
  const moveDown = () => setFocus([focus[0], focus[1] + 1]);
  const moveLeft = () => setFocus([focus[0] - 1, focus[1]]);
  const moveRight = () => setFocus([focus[0] + 1, focus[1]]);
  const currentArea = () => [
    focus[0] - 8,
    focus[1] - 5,
    focus[0] + 8,
    focus[1] + 5,
  ];

  const [nfts, setNfts] = useState<INFT[][]>([]);

  useEffect(() => {
    const nfts = Array(11).fill(0)
      .map(() => Array(17).fill(0).map(() => ({ stringData: '🌳' })));
    setNfts(nfts);

    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          moveUp();
          break;
        case 'ArrowDown':
        case 's':
          moveDown();
          break;
        case 'ArrowLeft':
        case 'a':
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
          moveRight();
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  const contract = useContract({
    address: '0x70C38C4279ca77020CB0551465d0783011D869ca',
    abi: EmojiInterface.abi,
  });

  const { data, isError, isLoading } = useContractRead({
    address: EmojiContract.address as any,
    abi: EmojiContract.abi,
    functionName: 'name',
  });

  return <div className={style.com}>
    {nfts.map((row) => <div className={style.row}>
      {row.map((nft) => <Emoji { ...nft } />)}
    </div>)}
    <span>{currentArea().join(',')}</span>
    <span>{data as any}</span>
  </div>;
}
