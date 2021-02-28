import createDataContext from './createDataContext';

const ctatReducer = (state, action) => {
    switch (action.type) {
        case 'create_analysis':
            return {...state, class_info: action.payload };
        default:
            return state;
    }
};

const createAnalysis = dispatch => {
    dispatch({ type: 'create_analysis'});
};

export const { Context, Provider }  = createDataContext(
    ctatReducer,
    { createAnalysis },
    {}
);