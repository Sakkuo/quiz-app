import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, NAME_QUIZ_HANDLE, FINISH_CREATE_NAME } from "../actions/actionTypes"

const initialState = {
    quiz: [],
    name: "Test"
}


export default function createReducer(state = initialState, action) {

    switch(action.type) {

        case CREATE_QUIZ_QUESTION:
            return {
                ...state, 
                quiz: [...state.quiz, action.item]
            }

        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: [],
                name: "Test"
            }

        case NAME_QUIZ_HANDLE:
            return {
                ...state, 
                name: action.name
            }

        case FINISH_CREATE_NAME:
            return {
                ...state,
                quiz: [{name: action.name}, ...state.quiz]
            }

        default:
            return state
    }
}