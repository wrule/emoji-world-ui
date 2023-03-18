import React from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { Modal, Form, Input, Row, Col, Spin } from 'antd';
import { Emoji } from './Emoji';
import { ethers } from 'ethers';
import EmojiInterface from '../contract/Emoji/interface.json';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EmojiSelector } from './EmojiSelector';

const EmojiContract = {
  address: '0x70C38C4279ca77020CB0551465d0783011D869ca',
  abi: EmojiInterface.abi,
};

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
  const [form] = Form.useForm<NFT>();

  const getNFTByCoordinatesResult = useContractRead({
    address: EmojiContract.address as any,
    abi: EmojiContract.abi,
    functionName: 'getNFTByCoordinates',
    args: props.coord || [0, 0],
  });

  const formDisabled = () => DataToNFT(getNFTByCoordinatesResult.data).tokenId !== '0';

  const { config } = usePrepareContractWrite({
    address: EmojiContract.address as any,
    abi: EmojiContract.abi,
    functionName: 'mint',
    args: [{
      stringData: '🌳',
      targetAddress: ethers.constants.AddressZero,
      x: props.coord?.[0] || 0,
      y: props.coord?.[1] || 0,
      tokenURI: '',
    }],
  });
  const wr = useContractWrite(config);

  if (getNFTByCoordinatesResult.isSuccess) {
    form.setFieldsValue(DataToNFT(getNFTByCoordinatesResult.data));
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
          <Emoji
            size={128}
            stringData={(getNFTByCoordinatesResult.data as any)?.['stringData']}
          />
        </Col>
        <Col span={16}>
          <Form
            layout="vertical"
            form={form}
            disabled={formDisabled()}>
            <Form.Item label="stringData" name="stringData">
              {/* <Input allowClear /> */}
              {/* <Picker data={data} onEmojiSelect={console.log} /> */}
              <EmojiSelector />
            </Form.Item>
            <Form.Item label="targetAddress" name="targetAddress">
              <Input allowClear />
            </Form.Item>
            {/* <Form.Item label="tokenURI">
              <Input
                allowClear
                value={DataToNFT(getNFTByCoordinatesResult.data).tokenURI}
              />
            </Form.Item> */}
          </Form>
        </Col>
      </Row>
    </Modal>;
  }
  return <></>;
}