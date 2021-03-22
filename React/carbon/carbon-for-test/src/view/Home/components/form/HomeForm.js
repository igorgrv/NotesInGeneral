import React from 'react';
import { Form, TextInput, InlineNotification, Button } from 'carbon-components-react';

const HomeForm = (props) => {

  const TextInputProps = {
    className: 'bx--col-lg-3',
    id: 'inputName',
    labelText: 'Name',
    placeholder: 'Type your name',
  };

  const additionalProps = {
    onSubmit: (e) => {
      e.preventDefault();
    },
  };

  const notificationProps = (title) => ({
    kind: 'success',
    lowContrast: true,
    hideCloseButton: false,
    title: title,
  });

  return (
    <Form {...additionalProps}>
      <TextInput {...TextInputProps} value={props.userName} onChange={props.change} />
      <br />
      <Button onClick={props.toggleUser}>Toggle User</Button>
      <InlineNotification {...notificationProps(props.children)} />
      {
        props.showUser &&
        <InlineNotification {...notificationProps(props.userName)} />
      }
    </Form>
  );
};

export default HomeForm;
