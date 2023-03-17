import React, { useEffect, useState } from 'react';
import { Emoji, INFT } from './Emoji';
import style from './View.module.scss';

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
      .map(() => Array(17).fill(0).map(() => ({ stringData: '🐶' })));
    setNfts(nfts);
  });

  return <div className={style.com}>
    {nfts.map((row) => <div className={style.row}>
      {row.map((nft) => <Emoji { ...nft } />)}
    </div>)}
  </div>;
}
