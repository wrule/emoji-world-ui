import React, { useState } from 'react';
import { Input, Popover } from 'antd';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import style from './EmojiSelector.module.scss';

export
function EmojiSelector() {
  const [emoji, setEmoji] = useState<string>('');

  return <Popover
    overlayClassName={style.com}
    placement="right"
    content={<Picker data={data} onEmojiSelect={(emojiData: any) => setEmoji(emojiData.native)} />}>
    <Input
      value={emoji}
      placeholder="Please select or enter Emoji"
      onChange={(e) => setEmoji(e.target.value)}
    />
  </Popover>;
}
