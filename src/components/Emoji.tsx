import React from 'react';
import style from './Emoji.module.scss';

export
interface INFT {
  stringData?: string;
}

export
function Emoji(props: INFT) {
  return <div className={style.com}>{(props.stringData || '')}</div>;
}
