import React from "react";
import { NavLink } from "react-router-dom";
import classes from '../QuizList/QuizList.css'
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends React.Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <NavLink 
                to={'/quiz/' + quiz.id}
                key={quiz.id}
                style={{
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '18px',
                }} 
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    <li
                    style={{
                    textAlign: 'center',
                    padding: '7px 0'
                    }}
                    >
                    {quiz.name}
                    </li>
                    </div>
                </NavLink>
            )
        })
    }

    componentDidMount() {

        this.props.fetchQuizes()
    
    }

    render () {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>

                    {
                    this.props.loading && this.props.quizes.length !== 0
                    ? <Loader />
                    :   <ul>
                            { this.renderQuizes() }
                        </ul>
                    }
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (QuizList)