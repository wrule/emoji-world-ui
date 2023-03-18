import React from 'react';
import { Modal } from 'antd';

export
function EmojiModal(props: {
  open?: boolean,
  coord: [number, number] | null | undefined,
  onCancel?: () => void,
}) {
  return <Modal
    title={`Emoji (${props.coord?.[0]}, ${props.coord?.[1]})`}
    open={props.open}
    onCancel={props.onCancel}>
  </Modal>;
}
