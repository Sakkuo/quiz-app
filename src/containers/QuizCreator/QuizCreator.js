import React from "react";
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from "../../form/formFramework"
import Input from '../../components/UI/Input/Input'
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import { connect } from "react-redux";
import { createQuizQuestion, finishCreateName, finishCreateQuiz, nameQuizHandle } from "../../store/actions/create";

function createOptionControl(number) {
    return createControl({
        label: `Variant ${number}`,
        errorMessage: 'Value cannot be empty',
        id: number,
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter a question',
            errorMessage: 'This field cannot be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state= {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        isCreateComplited: false
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)


        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    createQuizHandler =  event => {
        event.preventDefault()

            this.setState({
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls(),
                isCreateComplited: false
            })
            if (this.props.name) {
                this.props.finishCreateName(this.props.name)
            } else {
                this.props.finishCreateName('Test')
            }
            this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = {...formControls[controlName]}


        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)


        formControls[controlName] = control

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        })
    }
    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                { index === 0 ? <hr/> : null}
            </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    addName = () => {
        return (
        <div className={classes.divName}>
            Enter the name of the test
            <input 
            defaultValue="Test"
            className={classes.inputName}
            type='text'
            placeholder='Enter the test name'
            autoFocus
            onChange={
                (e) => this.props.nameQuizHandle(e.currentTarget.value)
            }
            />
        </div>
        )
    }





    render () {
        const select = <Select 
            label='Choose rigth answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create test</h1>

                    <form onSubmit={this.submitHandler}> 
                    
                        {this.renderControls()}

                        { select }
                        <div className={classes.btns}>
                            <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                            >
                                Add a question
                            </Button>


                            {!this.state.isCreateComplited
                            ? 
                            <Button
                            type='success'
                            // onClick={this.createQuizHandler}
                            onClick={() => this.setState({
                                isCreateComplited: true
                            })}
                            >
                                Create name
                            </Button>
                            :
                            <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                            >
                                Create test
                            </Button>
                            }
                        </div>
                            {this.state.isCreateComplited ? this.addName() : null}
                    </form>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quiz: state.create.quiz, 
        name: state.create.name
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
        nameQuizHandle: (name) => dispatch(nameQuizHandle(name)),
        finishCreateName: name => dispatch(finishCreateName(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (QuizCreator)