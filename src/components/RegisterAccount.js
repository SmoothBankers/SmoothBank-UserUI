/** 
 * The fields displayed should be email, address, account type, occupation, initial deposit
 */

import React, { Component, createRef } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';


class RegisterAccount extends Component {
    state = {
        account: {
            email: "",
            balance: "",
            account_type: ""
        },
        errors: {}
    };

    checkbox

    componentDidMount() {
        this.checkbox = createRef();

    }


    schema = {
        email: Joi.string().email().required().label("Email"),
        balance: Joi.number().greater(500).required().label("Balance"),
        account_type: Joi.string().valid('checking', 'savings').required().label("Account Type")
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        // console.log(this.checkbox);
        // console.log(errors);
        return errors;
    }

    validateField = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = async e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        try {
            const payload = { ...this.state.account };
            delete payload.confirmPass;
            const { data } = await axios.post('http://localhost:8090/accounts/signup', payload);

            localStorage.setItem("email", data.email);
            // localStorage.setItem("token", data.token);
            // window.location = '/success';

        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errorMessage = "Username already in use!";
                const errors = { ...this.state.errors };
                errors.username = errorMessage;
                this.setState({ errors });
            }
        }
    }

    handleChangeWithValidation = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    handleChange = ({ currentTarget: input }) => {
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account });
    }

    handleBlur = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        this.setState({ errors });
    }

    handleTerms = () => {
        const errors = { ...this.state.errors };
        if (!this.checkbox.current?.checked) {
            errors['item'] = "You must agree to the Terms of Service"

        }
        else {
            delete errors['item'];
        }

        this.setState({ errors });
    }


    render() {
        const spanStyle = {
            marginBottom: 0,
            position: 'absolute'
        }

        return (
            <div className="row">
                <div className="mt-5 offset-2 col-5">
                    <h1>Account Registration</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="email">Email:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.email}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="email"
                                    id="email" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.email}</span>

                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="lastName">Balance:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.balance}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="balance"
                                    id="balance" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.balance}</span>

                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="account_type">Account Type:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.account_type}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name="account_type"
                                    id="account_type" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.account_type}</span>

                            </div>
                        </div>
                        <div className="form-check mt-5">
                            <input ref={this.checkbox} onChange={this.handleTerms} className="form-check-input" type="checkbox" value="" id="terms" />
                            <label className="form-check-label" htmlFor="terms">
                                I agree to the Terms of Service
                            </label>
                        </div>
                        <button disabled={this.validate() || !this.checkbox?.current?.checked} className="mt-5 mb-3 btn btn-success">Submit</button>
                        <br></br>
                        {this.state.errors.general && <span className="text-danger">{this.state.errors.general}</span>}
                    </form>
                </div>
            </div>
        );
    }

}

export default RegisterAccount;

