import React, { Component } from "react";


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            email: ''
        };
    }
    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }
    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    OnPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    onSubmitRegister = () => {
        fetch('https://ai-brain.onrender.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(res => res.json()).then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })

    }
    render() {

        return (
            <article className="br4  ba  b--black-10 mv2 w-100 w-50-m w-25-l mw6 shadow-5 center">

                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

                            <legend className="f2 fw6 ph0 mh0">Register Form</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="Name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onNameChange}
                                    type="email"
                                    name="email-address" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    onChange={this.onEmailChange}
                                    name="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password"
                                    onChange={this.OnPasswordChange} placeholder="" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f3 dib" onClick={this.onSubmitRegister} type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        )

    }

}

export default Register;