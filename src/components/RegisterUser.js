import React, {Component, createRef} from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';


class RegisterUser extends Component {
    state = {
        account: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            confirmPass: ""
        },
        errors: {}
    };

    checkbox

    componentDidMount() {
        this.checkbox = createRef();

    }


    schema = {
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().label("Email"),
        username: Joi.string().required().min(8).label("Username"),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9,a-z,A-Z,!,@,#,$,%,^,&,*]{8,20}$/).required().label("Password"),
        confirmPass: Joi.any().valid(Joi.ref('password')).required().label("Confirm Password").options({ language: { any: { allowOnly: 'must match password' } } })
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
            const payload = {...this.state.account};
            delete payload.confirmPass;
            const { data } = await axios.post('http://localhost:8080/api/users', payload);

            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data.token);
            window.location = '/success';

        }
        catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errorMessage = "Username already in use!";
                const errors = {...this.state.errors };
                errors.username = errorMessage;
                this.setState({errors});
            }
        }
    }

    handleChangeWithValidation = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({account, errors});
    }

    handleChange = ({currentTarget: input}) => {
        const account = {...this.state.account};
        account[input.name] = input.value;
        this.setState({account});
    }

    handleBlur = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        this.setState({errors});
    }

    handleTerms = () => {
        const errors = {...this.state.errors};
        if (!this.checkbox.current?.checked) {
            errors['item'] = "You must agree to the Terms of Service"
            
        }
        else {
            delete errors['item'];
        }

        this.setState({errors});
    }


    render() {
        const spanStyle = {
            marginBottom: 0,
            position: 'absolute'
        }

        return ( 
            <div className="row">
                <div className="mt-5 offset-2 col-5">
                    <h1>Registration</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="firstName">First Name:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.firstName}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="firstName"
                                    id="firstName" type="text" className="form-control" />
                                    <span style={spanStyle} className="text-danger">{this.state.errors.firstName}</span>
                
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="lastName">Last Name:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.lastName}
                                    onChange={this.handleChangeWithValidation}
                                    onBlur={this.handleBlur}
                                    name="lastName"
                                    id="lastName" type="text" className="form-control" />
                                    <span style={spanStyle} className="text-danger">{this.state.errors.lastName}</span>
                
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="email">Email:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name="email"
                                    id="email" type="text" className="form-control" />
                                    <span style={spanStyle} className="text-danger">{this.state.errors.email}</span>
                
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="username">Username:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.username}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name="username"
                                    id="username" type="text" className="form-control" />
                                    <span style={spanStyle} className="text-danger">{this.state.errors.username}</span>
                
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="password">Password:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.password}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name="password"
                                    id="password" type="password" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.password}</span>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <label className="col-3 col-form-label" htmlFor="confirmPass">Confirm Password:</label>
                            <div className="col-5">
                                <input
                                    value={this.state.account.confirmPass}
                                    onChange={this.handleChange}
                                    onBlur={this.handleBlur}
                                    name="confirmPass"
                                    id="confirmPass" type="password" className="form-control" />
                                <span style={spanStyle} className="text-danger">{this.state.errors.confirmPass}</span>
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

                <div className="mt-5 col-5">
                    <h3 className="mt-5">If you are already registered, <Link style={{textDecoration:  "none", color: "#198754"}} to="/login">click here to log in</Link></h3>
                </div>
            </div>
         );
    }
    
}
 
export default RegisterUser;