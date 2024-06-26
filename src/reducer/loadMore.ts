import {   
    LoadMoreInitialState,
    LoadMoreActionTypes,
    SET_OFFSET_SUCCESS,
    SET_OFFSET_REMOVED,
    SET_OFFSET_CURRENT,
    SET_OFFSET_REVIEW,
    SET_OFFSET_FOOD,
    SET_CURRENT_NO_MORE,
    SET__SUCCESS_NO_MORE,
    SET__REMOVED_NO_MORE,} from "../types/loadMoreTypes";

export const initialState: LoadMoreInitialState = {
    offSetSuccess: 0,
    offSetRemoved: 0,
    offSetCurrent: 0,
    offSetReview: 0,
    offSetFood: 0,
    isMoreCurrent: true,
    isMoreCancle: true,
    isMoreSuccess: true
};
const loadMoreReducer = (state = initialState, action: LoadMoreActionTypes): LoadMoreInitialState => {
    switch (action.type) {
        case SET_OFFSET_SUCCESS:
            return {
                ...state,
                
                offSetSuccess: action.payload
            };
        case SET_OFFSET_REMOVED:
            return {
                ...state,
                offSetRemoved: action.payload
            };
        case SET_OFFSET_CURRENT:
            return {
                ...state,
                offSetCurrent: action.payload
            };
        case SET_OFFSET_REVIEW:
            return {
                ...state,
                offSetReview: action.payload
            };
        case SET_OFFSET_FOOD:
            return {
                ...state,
                offSetFood: action.payload
            };
        case SET_CURRENT_NO_MORE:
            return {
                ...state,
                isMoreCurrent: action.payload
                
            };
        case SET__SUCCESS_NO_MORE:
            return {
                ...state,
                isMoreSuccess: action.payload
            };
        case SET__REMOVED_NO_MORE:
            return {
                ...state,
                isMoreCancle: action.payload
            }
        default:
            return state;
    }
};

export default loadMoreReducer;