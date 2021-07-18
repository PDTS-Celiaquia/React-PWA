import React, { Component } from 'react'
import { loginService } from '../services/auth';

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "admin@gmail.com",
            password: "123456"
        }

        this.login = this.login.bind(this)
    }

    login() {
        const { email, password } = this.state;
        loginService(email, password)
            .then(
                response => this.props.history.push("/"),
                error => this.setState({ error })
            )
    }

    render() {
        return (
            <div>
                <button onClick={this.login} />
            </div>
        )
    }
}

export default LoginPage;
