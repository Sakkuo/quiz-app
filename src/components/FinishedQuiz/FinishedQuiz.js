import React from "react";
import classes from './FinishedQuiz.css'
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";


const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
                
            </ul>

            <p>Correct  {successCount} of {props.quiz.length}</p>
            {console.log(successCount)}

            <div className={classes.btns}>
                <Button onClick={props.onRetry} type="primary">Repeat</Button>
                <Link to='/'>
                    <Button type="success">Go to test list</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz