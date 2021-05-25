import React, {Component} from 'react';
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

    pattern = "/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9,a-z,A-Z,!,@,#,$,%,^,&,*]{8,20}$/";

    schema = {
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email(),
        username: Joi.string().required().min(8).label("Username"),
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9,a-z,A-Z,!,@,#,$,%,^,&,*]{8,20}$/).required().label("Password"),
        confirmPass: Joi.string().required().label("Confirm Password")
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        console.log(errors);
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

            // localStorage.setItem("username", data.user);
            // localStorage.setItem("token", data.token);
            // window.location = '/';

        }
        catch (ex) {
            if (ex.response && ex.response.status === 403){
                const errorMessage = "Username and/or password do not match any registered users!";
                const errors = {...this.state.errors };
                errors.general = errorMessage;
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


    render() {
        const spanStyle = {
            marginBottom: 0,
            position: 'absolute'
        }

        return ( 
            <div className="mt-5 offset-2 col-5">
                <h1>Registration</h1>
    
                <form onSubmit={this.handleSubmit}>
                    <div className="row mt-5">
                        <label className="col-3 col-form-label" htmlFor="firstName">First Name:</label>
                        <div className="col-5">
                            <input
                                value={this.state.account.firstName}
                                onChange={this.handleChangeWithValidation}
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
                                name="confirmPass"
                                id="confirmPass" type="password" className="form-control" />
                            <span style={spanStyle} className="text-danger">{this.state.errors.confirmPass}</span>
                        </div>
                    </div>
    
                    <button disabled={this.validate()} className="mt-5 mb-3 btn btn-success">Submit</button>
                    <br></br>
                    {this.state.errors.general && <span className="text-danger">{this.state.errors.general}</span>}
                </form>
    
            </div>
         );
    }
    
}
 
export default RegisterUser;