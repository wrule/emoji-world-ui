import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';
import { Emoji } from './Emoji';

export
function EmojiModal(props: {
  open?: boolean,
  coord: [number, number] | null | undefined,
  onCancel?: () => void,
}) {
  return <Modal
    title={`EMOJI ${123}  [${props.coord?.[0]}, ${props.coord?.[1]}]`}
    open={props.open}
    onCancel={props.onCancel}>
    <Row justify="space-between">
      <Col span={8}>
        <Emoji
          size={128}
          stringData="🌳"
        />
      </Col>
      <Col span={16}>
        <Form
          layout="vertical">
          <Form.Item label="stringData">
            <Input
              allowClear
            />
          </Form.Item>
          <Form.Item label="targetAddress">
            <Input
              allowClear
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </Modal>;
}
