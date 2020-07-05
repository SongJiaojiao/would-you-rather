import { getInitialData } from '../utils/api'
import { receiveUsers,receiveQuestions } from '../actions/index'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(hideLoading())
            })
    }
}
