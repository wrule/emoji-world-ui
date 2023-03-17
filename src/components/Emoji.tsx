import React from 'react';
import style from './Emoji.module.scss';

export
function Emoji(props: { emoji?: string }) {
  return <div className={style.com}>{(props.emoji || '')}</div>;
}
