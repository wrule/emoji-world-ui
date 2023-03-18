import React from 'react';
import style from './Emoji.module.scss';

export
interface INFT {
  size?: number;
  stringData?: string;
  onClick?: () => void;
}

export
function Emoji(props: INFT) {
  return <div
    style={props.size ? {
      width: `${props.size}px`,
      height: `${props.size}px`,
      fontSize: `${props.size - 1}px`,
    } : { }}
    className={style.com}
    onClick={() => props.onClick?.()}>
    {(props.stringData || '')}
  </div>;
}
