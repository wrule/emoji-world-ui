import React, { useState } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Modal, Form, Input, Row, Col, Spin } from 'antd';
import { Emoji } from './Emoji';
import { ethers } from 'ethers';
import { EmojiSelector } from './EmojiSelector';
import { EmojiContract } from '../contract/Emoji';

export
interface NFT {
  tokenId: string;
  x: number;
  y: number;
  stringData: string;
  targetAddress: string;
  tokenURI: string;
}

export
function DataToNFT(data: any): NFT {
  return {
    tokenId: data['tokenId'].toString(),
    x: Number(data['x']),
    y: Number(data['y']),
    stringData: data['stringData'],
    targetAddress: data['targetAddress'],
    tokenURI: data['tokenURI'] || '',
  };
}

export
function EmojiModal(props: {
  open?: boolean,
  coord: [number, number] | null | undefined,
  onCancel?: () => void,
}) {
  const [emoji, setEmoji] = useState<string>('');
  const getNFTByCoordinatesResult = useContractRead({
    ...EmojiContract,
    functionName: 'getNFTByCoordinates',
    args: props.coord || [0, 0],
  });
  const formDisabled = () => DataToNFT(getNFTByCoordinatesResult.data).tokenId !== '0';

  const { config } = usePrepareContractWrite({
    address: EmojiContract.address as any,
    abi: EmojiContract.abi,
    functionName: 'mint',
    args: [{
      stringData: emoji,
      targetAddress: ethers.constants.AddressZero,
      x: props.coord?.[0] || 0,
      y: props.coord?.[1] || 0,
      tokenURI: '',
    }],
  });
  const wr = useContractWrite(config);

  if (getNFTByCoordinatesResult.isSuccess) {
    return <Modal
      title={`EMOJI ${DataToNFT(getNFTByCoordinatesResult.data).tokenId}  [${props.coord?.[0]}, ${props.coord?.[1]}]`}
      open={props.open}
      okText="Mint"
      footer={formDisabled() ? null : undefined}
      onOk={() => {
        wr.write?.();
      }}
      onCancel={props.onCancel}>
      <Row justify="space-between">
        <Col span={8}>
          <Emoji size={128} stringData={emoji} />
        </Col>
        <Col span={16}>
          <Form
            layout="vertical"
            disabled={formDisabled()}>
            <Form.Item label="Emoji" name="stringData">
              <EmojiSelector value={emoji} onChange={setEmoji} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>;
  }
  return <></>;
}