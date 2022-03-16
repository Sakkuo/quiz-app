import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, NAME_QUIZ_HANDLE, FINISH_CREATE_NAME } from "./actionTypes";
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function nameQuizHandle(name) {
    return {
        type: NAME_QUIZ_HANDLE,
        name
    }
}

export function finishCreateName(name) {
    return {
        type: FINISH_CREATE_NAME,
        name
    }
}


export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz(name) {
    nameQuizHandle(name)
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}