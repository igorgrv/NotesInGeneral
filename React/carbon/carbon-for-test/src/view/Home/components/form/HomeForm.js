import React from 'react';
import { Form, TextInput, InlineNotification } from 'carbon-components-react';

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

const HomeForm = (props) => (
  <Form {...additionalProps}>
    <TextInput {...TextInputProps} value={props.userName} onChange={props.change} />
    <InlineNotification {...notificationProps(props.children)} />
    <InlineNotification {...notificationProps(props.userName)} />
  </Form>
);

export default HomeForm;
