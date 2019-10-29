import {getCookie} from "../../actions/app";

const initialState = {
    auth: {
        isAuthenticated: false
    }
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }

}
