import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER'

//Receive Data
export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}



//Add question
function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

function addQuestionToUser({ id, author }) {
    return {
        type: ADD_QUESTION_TO_USER,
        id,
        author
    }
}

export function handleAddQuestion({ optionOneText, optionTwoText, author }) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then((question) => {
                dispatch(addQuestion(question))
                dispatch(addQuestionToUser(question))

            })
            .then(() => dispatch(hideLoading()))
    }

}

//Save Answer

function saveAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function saveAnswerToUser({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER_TO_USER,
        authedUser,
        qid,
        answer
    }
}


export function handleSaveAnswer(data) {
    return (dispatch) => {
        dispatch(saveAnswer(data))
        dispatch(saveAnswerToUser(data))

        return (saveQuestionAnswer(data)
            .catch((error) => {
                alert('Sorry, please try again')
            })
        )

    }
}
