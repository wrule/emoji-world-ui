import React from 'react';
import { Emoji } from './Emoji';
import style from './View.module.scss';

export
function View() {
  return <div className={style.com}>
    {Array(11).fill(0).map(() => <div className={style.row}>
      {Array(17).fill(0).map(() => <Emoji emoji='🐷' />)}
    </div>)}
  </div>;
}
