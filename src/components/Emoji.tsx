import React from 'react';
import style from './Emoji.module.scss';

export
interface INFT {
  stringData?: string;
  onClick?: () => void;
}

export
function Emoji(props: INFT) {
  return <div className={style.com} onClick={() => props.onClick?.()}>{(props.stringData || '')}</div>;
}
