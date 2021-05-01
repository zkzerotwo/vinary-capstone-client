import React from "react"
import NavBar from '../NavBar'
import ValidationError from "../ValidationError"
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import { NavLink } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: {
                value: "",
                touched: false,
            },
            password: {
                value: "",
                touched: false,
            },
            LogInUserID: 0,
            error: null,
        };
    }

    changeUsername(userName) {
        this.setState({
            userName: { value: userName },
        });
    }

    changePassword(password) {
        this.setState({
            password: { value: password },
        });
    }

    validateUserName() {
        const userName = this.state.userName.value.trim();
        if (userName.length === 0) {
            return "Username is required"
        } else if (userName.length < 2) {
            return (
                "Username must be at least 2 characters long"
            );
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return <p className="input-error">Password is required</p>;
        } else if (password.length < 6 || password.length > 72) {
            return (
                "Password must be between 6 and 72 characters long."
            );
        } else if (!password.match(/[0-9]/)) {
            return (

                "Password must contain at least one number."

            );
        }
    }

    loginUser = (event) => {
        event.preventDefault();
        const { userName, password } = event.target;
        AuthApiService.postLogin({
            user_name: userName.value,
            password: password.value,
        })

            .then((response) => {

                TokenService.saveAuthToken(response.authToken);
                TokenService.saveUserId(response.userId);
                window.location = "/dashboard/";
            })
            .catch((err) => {
                this.setState({
                    error: "Username or password is invalid"
                })
            });
            
    };

    render() {
        const msg = this.state.error ? <p>
            {this.state.error}
        </p> :
            <div></div>;
        return (
            <section>
                <NavBar />
                <div className="Login">
                    <section id="loginPage">
                        <h2>Login</h2>
                        <p className="demo">To view a demo:</p>
                        <p className="demo">email: demo@gmail.com</p>
                        <p className="demo">password: Password1</p>

                        <form className="loginForm" onSubmit={this.loginUser}>
                            <div className="errorMessage">
                                {msg}
                            </div>
                            <label htmlFor="userName">Username</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="Username"
                                onChange={(e) =>
                                    this.changeUsername(e.target.value)
                                }
                                required
                            />
                            {this.state.userName.touched && (
                                <ValidationError
                                    message={this.validateUserName()}
                                />
                            )}
                            <ValidationError
                                message={this.validateUserName()}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="Password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    this.changePassword(e.target.value)
                                }
                                required
                            />
                            {this.state.password.touched && (
                                <ValidationError
                                    message={this.validatePassword()}
                                />
                            )}
                            <ValidationError
                                message={this.validatePassword()}
                            />


                            <button
                                className="go-button"
                                type="submit"
                            >
                                Go
                        </button>
                            <div className="signUp">
                                <p>
                                    Don't have an account?{" "}
                                </p>
                                <p>
                                    <NavLink to='/register'>Sign up here</NavLink>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        );
    }
}

export default Login;