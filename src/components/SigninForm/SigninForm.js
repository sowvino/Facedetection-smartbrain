import React, { Component } from "react";

class SigninForm extends Component {
    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        };
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }
    onSubmitSignIn = () => {
        fetch('https://smartbrainapi-3v9h.onrender.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(res => res.json()).then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })

    }


    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br4  ba  b--black-10 mv2 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba
                                 bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    onChange={this.onEmailChange}
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset 
                                ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password"
                                    onChange={this.onPasswordChange}
                                    placeholder="" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset 
                            ba b--black bg-transparent grow pointer f3 dib"
                                onClick={this.onSubmitSignIn}
                                type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" onClick={() =>
                                onRouteChange('Register')} className="f3 
                                link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }

}


export default SigninForm;