import React, { Component } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';


class Profile extends Component {
    state = { 
        user: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPass: "",
            currentPass: ""
        },
        errors: {},
        editEmail: false,
        editPassword: false
    };

    emailSchema = {
        email: Joi.string().email().label("Email"),
    };

    passwordSchema = {
        password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9,a-z,A-Z,!,@,#,$,%,^,&,*]{8,20}$/).required().label("Password"),
        confirmPass: Joi.any().valid(Joi.ref('password')).required().label("Confirm Password").options({ language: { any: { allowOnly: 'must match password' } } })
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const headers = {
            "Authorization": token
        }
        return axios.get(`http://localhost:8080/api/users/${userId}`, {headers})
            .then(res => this.setState({user: res.data}))
            .catch(err => console.log(err));
               
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate({"email": this.state.user.email}, this.emailSchema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    
    validatePassword = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate({"password": this.state.user.password, "confirmPass": this.state.user.confirmPass}, this.passwordSchema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateEmailField = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.emailSchema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null; 
    }

    validateField = ({ name, value }) => {
        if (name === "currentPass") return null;
        const obj = { [name]: value };
        const schema = { [name]: this.passwordSchema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null; 
    }

    handleEmailChange = ({currentTarget: input}) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateEmailField(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        }
        else {
            delete errors[input.name];
        }

        const user = {...this.state.user};
        user[input.name] = input.value;
        this.setState({user, errors});
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

        const user = {...this.state.user};
        user[input.name] = input.value;
        this.setState({user, errors});
    }

    handleEmailUpdate = async (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors)
            console.log(errors)
        if (errors) return;

        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const headers = {
            "Authorization": token
        }

        try {
            const { data } = await axios.put(`http://localhost:8080/api/users/${userId}`, {"email": this.state.user.email}, {headers});
            console.log(data);
            
            window.location = '/profile';

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

    handlePasswordChange = async (e) => {
        e.preventDefault();

        const errors = this.validatePassword();
        this.setState({ errors: errors || {} });
        if (errors)
            console.log(errors)
        if (errors) return;

        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const headers = {
            "Authorization": token
        }

        try {
            const { data } = await axios.put(`http://localhost:8080/api/users/${userId}`, {"newPassword": this.state.user.password, "password": this.state.user.currentPass}, {headers});
            console.log(data);
            
            window.location = '/profile';

        }
        catch (ex) {
            if (ex.response && ex.response.status === 400){
                const errorMessage = "Current Password is incorrect!";
                const errors = {...this.state.errors };
                errors.general = errorMessage;
                this.setState({errors});
            }
        }
    }

    editEmailInput = () => {
        this.setState({editEmail: !this.state.editEmail});
    }
    
    showPasswordFields = () => {
        this.setState({editPassword: !this.state.editPassword});
    }

    render() {
        const spanStyle = {
            marginBottom: 0,
            position: 'absolute'
        }
        console.log(this.state.errors) 
        return (
            
            <div className="row">
                <div className="mt-5 offset-2 col-4">
                    <h1>Profile</h1>
                    <div className="profile__container">
                        <p>First Name:</p>
                        <p>{this.state.user?.firstName}</p>
                        <p className="profile__item">Last Name:</p>
                        <p>{this.state.user?.lastName}</p>
                        <p className="profile__item">Username:</p>
                        <p>{this.state.user?.username}</p>
                        <p className="profile__item">Email:</p>
                        <div>
                            <input
                                className="form-control"
                                type="text"
                                name="email"
                                value={this.state.user.email}
                                onChange={this.handleEmailChange}
                                disabled={!this.state.editEmail}
                            />
                            <span style={spanStyle} className="text-danger">{this.state.errors.email}</span>
                        </div>
                        {!this.state.editEmail ?
                        <button
                            className="btn btn-warning"
                            onClick={this.editEmailInput}
                            >Update Email
                        </button> :
                        <button
                            className="btn btn-success"
                            onClick={this.handleEmailUpdate}
                            >Save Changes
                        </button>
                        }
                        
                        
                    </div>
                    <div className="mt-5">
                        <h4>Security</h4>
                        <button
                            className="btn btn-warning mt-3"
                            onClick={this.showPasswordFields}
                            >Change Password
                        </button>
                        <button
                            className="btn btn-secondary mt-3 ms-3"
                            
                            >Forgot Password
                        </button>
                        {this.state.editPassword ?
                            <>
                                <div className="row mt-5">
                                    <label className="col-3 col-form-label" htmlFor="currentPass">Current Password:</label>
                                    <div className="col-5">
                                        <input
                                            value={this.state.user.currentPass}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            name="currentPass"
                                            id="currentPass" type="password" className="form-control" />
                                        <span style={spanStyle} className="text-danger">{this.state.errors.currentPass}</span>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <label className="col-3 col-form-label" htmlFor="password">Password:</label>
                                    <div className="col-5">
                                        <input
                                            value={this.state.user.password}
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
                                            value={this.state.user.confirmPass}
                                            onChange={this.handleChange}
                                            onBlur={this.handleBlur}
                                            name="confirmPass"
                                            id="confirmPass" type="password" className="form-control" />
                                        <span style={spanStyle} className="text-danger">{this.state.errors.confirmPass}</span>
                                    </div>
                                </div>
                                <button disabled={this.validatePassword()}className="mt-5 mb-3 btn btn-success" onClick={this.handlePasswordChange}>Change Password</button>
                                <br></br>
                                {this.state.errors.general && <span className="text-danger">{this.state.errors.general}</span>}
                            </> : ""
                        }
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Profile;