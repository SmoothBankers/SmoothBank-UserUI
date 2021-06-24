import React, { Component, createRef } from 'react';
import Joi from 'joi-browser';
import axios from 'axios';

class LoanRegistration extends Component {

    state = {
        holder: {
            name: "",
            home_phone: "",
            cell_phone: "",
            work_phone: "",
            email: "",
            ssn: "",
            address: "",
            po_box: "",
            zipcode: "",
            monthly_income: "",
            amount_requested: ""
            //any additional information goes here
        },
        errors: {}
    };

    checkbox;

    componentDidMount() {
        this.checkbox = createRef();
    }

    schema = {
        name: Joi.string().required().label("Your name"),
        email: Joi.string().required().email({ minDomainAtons: 2 }).label("Email"),
        home_phone: Joi.string().min(10).label("Home phone"),
        cell_phone: Joi.string().min(10).required().label("Cell phone"),
        work_phone: Joi.string().min(10).required().label("Work phone"),
        address: Joi.string().required().label("Mailing address"),
        po_box: Joi.string().label("P.O box"),
        zipcode: Joi.number().required().label("Zipcode"),
        amount_requested: Joi.number().required().label("Requested amount"),
        monthly_income: Joi.number().required().label("Monthly income"),
        ssn: Joi.string().min(9).max(9).required().label("Social Security Number")
        //any additional information goes here
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.holder, this.schema, options)
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        //console.log(errors);
        return errors;
    }

    validateField = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleSubmit = async e => {
        //This code taken largely from RegisterUser.js, so any questions on how it works or why something
        //is the way that it is should be directed to Saif Zahedi
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        try {
            const loan = JSON.parse(localStorage.getItem("loan"));
            const payload = { ...this.state.holder, loan };
            delete payload.confirmPass;
            const { data } = await axios.post('http://localhost:8081/api/loans', payload);
            //Data will contain the results of the axios post, such as any tokens or data
            //console.log(data);
            if (data.id) {
                alert("Your loan id is " + data.id + ". Please keep track of this number in the event you need assistance with your loan.")
            }

            /**
             * localStorage.setItem("username", data.username);
             * localStorage.setItem("token", data.token);
             * window.location = '/success';
             */
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errorMessage = "There is already a loan under your name";
                const errors = { ...this.state.errors };
                errors.message = errorMessage;
                this.setState({ errors });
            }
        }
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

    handleChangeWithValidation = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name]
        }
        const holder = { ...this.state.holder };
        holder[input.name] = input.value;
        this.setState({ holder, errors });
    }

    handleChange = ({ currentTarget: input }) => {
        const holder = { ...this.state.holder };
        holder[input.name] = input.value;
        this.setState({ holder });
    }

    handleBlur = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }

        this.setState({ errors });
    }

    handleTerms = () => {
        const errors = { ...this.state.errors };
        if (!this.checkbox.current?.checked) {
            errors['item'] = "You must agree to the Terms of Service";
        } else {
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
                <div className="mt-f offset-2 col-5">
                    <h1> Loan Registration</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="name">Legal Name:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.name}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="name"
                                    id="name" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.name}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="email">Email:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.email}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="email"
                                    id="email" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.email}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="home_phone">Home phone:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.home_phone}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="home_phone"
                                    id="home_phone" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.home_phone}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="cell_phone">Cell phone:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.cell_phone}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="cell_phone"
                                    id="cell_phone" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.cell_phone}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="work_phone">Work phone:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.work_phone}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="work_phone"
                                    id="work_phone" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.work_phone}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="Address">Address:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.address}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="address"
                                    id="address" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.address}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="po_box">Apt./P.O Box:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.po_box}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="po_box"
                                    id="po_box" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.po_box}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="zipcode">Zipcode:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.zipcode}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="zipcode"
                                    id="zipcode" type="number" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.zipcode}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="ssn">Social Security Number:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.ssn}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="ssn"
                                    id="ssn" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.ssn}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="monthly_income">Monthly income:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.monthly_income}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="monthly_income"
                                    id="monthly_income" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.monthly_income}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="amount_requested">Desired loan amount:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.holder.amount_requested}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="amount_requested"
                                    id="amount_requested" type="text" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.amount_requested}</span>
                            </div>
                        </div>
                        <div className="form-check mt-5">
                            <input ref={this.checkbox} onChange={this.handleTerms} className="form-check-input" type="checkbox" value="" id="terms" />
                            <label className="form-check-label" htmlFor="terms">
                                I agree to the Terms of Service
                            </label>
                        </div>
                        <br></br>
                        <button disabled={this.validate() || !this.checkbox?.current?.checked} className="mt-5 mb-3 btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        )

    }

}

export default LoanRegistration;