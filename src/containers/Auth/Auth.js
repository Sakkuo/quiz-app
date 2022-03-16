import React from "react";
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Please enter a valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Please enter a valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    
    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value, 
            true
        )
    }
    
    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value, 
            false
        )
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }



        return isValid
    }

    onChangeHandler= (event, controlName) => {

        const formControls = { ...this.state.formControls }
        const control = {...formControls[controlName]}


        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    placeholder='Write'
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }


    wrongPassMessage = () => {
        return (
            <div className={classes.wrongPasDiv}>
                Wrong password/email
            </div>
        )
    }

    
    render () {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                        { this.renderInputs() }
                        {!this.props.authSuccess 
                        ? this.wrongPassMessage()
                        : null
                        }
                        <div className={classes.btns}>
                            <Button 
                                type='success'
                                onClick={ this.loginHandler}
                                disabled={!this.state.isFormValid}
                            >Sign in</Button>
                                
                            <Button 
                                type='primary'
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                            >Sign Up</Button>
                        </div>


                    </form>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        authSuccess: state.auth.authSuccess
    }
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Auth)
