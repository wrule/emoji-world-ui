import React, { useEffect, useState } from 'react';
import style from './View.module.scss';
import { useContract, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
import { EmojiModal } from './EmojiModal';
import { EmojiContract } from '../contract/Emoji';
import { Emoji } from './Emoji';

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

  // const [nfts, setNfts] = useState<INFT[][]>([]);

  useEffect(() => {
    // const nfts = Array(11).fill(0)
    //   .map(() => Array(17).fill(0).map(() => ({ stringData: '🌳' })));
    // setNfts(nfts);

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

  const { data, isError, isLoading } = useContractRead({

    functionName: 'name',
    keepPreviousData: true,
  });

  const getNFTsInRectangleResult = useContractRead({
    ...EmojiContract,
    functionName: 'getNFTsInRectangle',
    args: currentArea(),
    keepPreviousData: true,
  });

  const nfts = () => {
    const result = (getNFTsInRectangleResult.data || []) as any[][];
    return result.map((row) => row.map((data) => ({
      x: Number(data['x']),
      y: Number(data['y']),
      stringData: data['stringData'],
    })));
  };


  const { config } = usePrepareContractWrite({
    ...EmojiContract,
    functionName: 'mint',
    args: [{
      stringData: '🎄',
      targetAddress: ethers.constants.AddressZero,
      x: -3,
      y: -4,
      tokenURI: '',
    }],
  });
  const wr = useContractWrite(config);

  const [coord, setCoord] = useState<[number, number] | null>(null);

  return <div className={style.com}>
    {nfts().map((row) => <div className={style.row}>
      {row.map((nft) => <Emoji { ...nft } onClick={() => {
        console.log(nft);
        setCoord([nft.x, nft.y]);
      }} />)}
    </div>)}
    {/* <p>
    <span>{currentArea().join(',')}</span>
    </p>
    <p>
    <span>{data as any}</span>
    </p>
    <p>
      {JSON.stringify(a?.data)}
    </p> */}
    {/* <p>
      {JSON.stringify(wr?.data)}
    </p> */}
    {/* <p>
      <Button onClick={async () => {
        wr.write?.();
      }}>Mint</Button>
    </p> */}
    <EmojiModal
      open={!!coord}
      coord={coord}
      onCancel={() => setCoord(null)}
    />
  </div>;
}
