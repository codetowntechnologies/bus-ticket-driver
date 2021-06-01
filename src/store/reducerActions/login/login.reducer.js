const initialState = {
    user: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            if(action.payload && action.payload.data && action.payload.data.status && action.payload.data.status == "ok") {
                return {
                    ...state,
                    user: action.payload.data.data
                };
            } else {
                return {
                    ...state,
                };
            }
        }
        case 'RESUME_USER': {
            return {
                ...state,
                user: action.payload
            };
        }
        case 'PROFILE_DETAIL': {
            if(action.payload && action.payload.data && action.payload.data.status && action.payload.data.status == "ok") {
                return {
                    ...state,
                    user: action.payload.data.data
                };
            } else {
                return {
                    ...state,
                };
            }
        }
        case 'UPDATE_PROFILE': {
            if(action.payload && action.payload.data && action.payload.data.status && action.payload.data.status == "ok") {
                return {
                    ...state,
                    user: action.payload.data.data
                };
            } else {
                return {
                    ...state,
                };
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default loginReducer;
