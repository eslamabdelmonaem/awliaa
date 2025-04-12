import { Form, FormInstance, Input } from 'antd';

export default function MartialStatus({ form }: { form: FormInstance }) {
  return (
    <Form form={form} layout="vertical" className="form-container">
      <Form.Item name="hello" className="user-info-select w-[50%]">
        <Input placeholder="hello" />
      </Form.Item>
    </Form>
  );
}
