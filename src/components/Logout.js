import React, { Component } from 'react';

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        window.location = "/";
    }

    render() { 
        return null;
    }
}
 
export default Logout;