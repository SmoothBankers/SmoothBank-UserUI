import React, {Component} from 'react';
import Joi from 'joi-browser';
import axios from 'axios';


class Login extends Component {
    state = {
        account: {
            username: "",
            password: ""
        },
        errors: {}
    };

    
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.account, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
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
            const { data } = await axios.post('http://localhost:8080/api/users/authenticate', this.state.account);
            console.log(data);
            localStorage.setItem("username", data.username);
            localStorage.setItem("token", data.token);
            window.location = '/success';

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

    handleChange = ({currentTarget: input}) => {
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


    render() {
        const spanStyle = {
            marginBottom: 0,
            position: 'absolute'
        }
    
        return ( 
            <div className="mt-5 offset-2 col-5">
                <h1>Welcome Back!</h1>
    
                <form onSubmit={this.handleSubmit}>
                    <div className="row mt-5">
                        <label className="col-2 col-form-label" htmlFor="username">Username:</label>
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
                        <label className="col-2 col-form-label" htmlFor="password">Password</label>
                        <div className="col-5">
                            <input
                                value={this.state.account.password}
                                onChange={this.handleChange}
                                name="password"
                                id="password" type="password" className="form-control" />
                            <span style={spanStyle} className="text-danger">{this.state.errors.password}</span>
                        </div>
                    </div>
    
                    <button disabled={this.validate()} className="mt-5 mb-3 btn btn-success">Log In</button>
                    <br></br>
                    {this.state.errors.general && <span className="text-danger">{this.state.errors.general}</span>}
                </form>
    
            </div>
         );
    }
    
}
 
export default Login;