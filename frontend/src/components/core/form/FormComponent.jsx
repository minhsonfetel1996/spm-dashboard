import React from "react";
import Joi from "joi-browser";
import { post } from "../../../services/http.service";

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      errors: null,
    };
  }

  getSchema() {}

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.getSchema(), options);
    if (!error) {
      return null;
    }
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.getSchema()[name] };

    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    const errors = this.validate();
    if (errors) {
      return this.setState({ errors });
    }
    this.submit();
  };

  submitUrl() {}
  processSubmitSuccessful(response) {}
  processSubmitUnsuccessful(response) {}

  async submit() {
    const response = await post(this.submitUrl(), {
      ...this.state.data,
    });
    if (response.status === 200) {
      this.processSubmitSuccessful(response);
    } else {
      this.processSubmitUnsuccessful(response);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    if (errors[input.name]) {
      const errorMsg = this.validateProperty(input);
      if (errorMsg) {
        errors[input.name] = errorMsg;
      } else {
        delete errors[input.name];
      }
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
}
