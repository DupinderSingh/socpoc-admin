import {getCookie} from "../../actions/app";

const initialState = {
    auth: {
        isAuthenticated: true
    }
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }

}
