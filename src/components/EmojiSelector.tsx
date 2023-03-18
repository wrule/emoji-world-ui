import React, { useState } from 'react';
import { Input, Popover } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import style from './EmojiSelector.module.scss';

export
interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export
function EmojiSelector(props: IProps) {
  const [emoji, setEmoji] = useState<string>(props.value || '🌲');

  const updateEmoji = (value: string) => {
    setEmoji(value);
    props.onChange?.(value);
  };

  return <Popover
    overlayClassName={style.com}
    placement="right"
    content={<Picker
      data={data}
      onEmojiSelect={(emojiData: any) => updateEmoji(emojiData.native)}
    />}>
    <Input
      value={emoji}
      placeholder="Please select or enter Emoji"
      onChange={(e) => updateEmoji(e.target.value)}
    />
  </Popover>;
}
