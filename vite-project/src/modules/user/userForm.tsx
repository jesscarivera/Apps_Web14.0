import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: string[];
  status: boolean;
};

const UserForm = () => {
  const [form] = Form.useForm(); // Hook 

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    form.resetFields(); // Esto limpia todos los campos después del envío
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form} // Conectamos el hook al formulario
      name="userForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ 
        role: ['cliente'],
        status: true 
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Nombre"
        name="name"
        rules={[{ required: true, message: 'Ingrese el nombre' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Usuario"
        name="username"
        rules={[{ required: true, message: 'Ingrese el usuario' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: 'Ingrese la contraseña' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Ingrese el email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Teléfono"
        name="phone"
        rules={[{ required: true, message: 'Ingrese el teléfono' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        name="status"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Usuario activo</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;