/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Space } from 'antd';

function Input({ onChange, value }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} />
  );
}
Input.displayName = 'input';

function FormItem(props) {
  const {
    children,
    name,
    label,
    value,
    handleChange,
  } = props;

  const onChange = value => {
    handleChange(name, value);
  };

  return (
    <div className="form">
      <span className="label">{label}</span>
      {
        React.isValidElement(children) && children.type.displayName === 'input'
          ? React.cloneElement(children, {
            value,
            onChange,
          })
          : null
      }
    </div>
  );
}
FormItem.displayName = 'formItem';

class Form extends React.Component {
  state = { formData: {} };

  submitForm = cb => {
    const { formData } = this.state;
    cb({ ...formData });
  };

  resetForm = () => {
    const { formData } = this.state;
    Object.keys(formData).forEach(item => {
      formData[item] = '';
    });
    this.setState({ formData });
  };

  setValue = (name, value) => {
    const { formData } = this.state;
    formData[name] = value;
    this.setState({ formData });
  };

  render() {
    const { formData } = this.state;
    const { children } = this.props;

    const renderChildren = [];
    React.Children.forEach(children, child => {
      if (child.type.displayName === 'formItem') {
        const { name } = child.props;
        const newChild = React.cloneElement(child, {
          key: name,
          value: formData[name] || '',
          handleChange: this.setValue,
        }, child.props.children);
        renderChildren.push(newChild);
      }
    });

    return renderChildren;
  }
}
Form.displayName = 'form';

function Index() {
  const form = React.useRef(null);

  const submit = () => {
    form.current.submitForm(formData => {
      console.log('formData :>> ', formData);
    });
  };

  const reset = () => {
    form.current.resetForm();
  };

  return (
    <div className="box">
      <Form ref={form}>
        <FormItem name="name" label="我是">
          <Input />
        </FormItem>
        <FormItem name="msg" label="我想对大家说">
          <Input />
        </FormItem>
      </Form>
      <Space>
        <Button onClick={submit}>提交</Button>
        <Button onClick={reset}>重置</Button>
      </Space>
    </div>
  );
}

export default Index;

