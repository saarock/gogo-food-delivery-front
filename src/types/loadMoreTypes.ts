// types.ts
export const SET_OFFSET_SUCCESS = 'SET_OFFSET_SUCCESS';
export const SET_OFFSET_REMOVED = 'SET_OFFSET_REMOVED';
export const SET_OFFSET_CURRENT = 'SET_OFFSET_CURRENT';
export const SET_OFFSET_REVIEW = 'SET_OFFSET_REVIEW';
export const SET_OFFSET_FOOD = 'SET_OFFSET_FOOD';
export const SET_CURRENT_NO_MORE = 'SET_CURRENT_NO_MORE';
export const SET__REMOVED_NO_MORE = 'SET_REMOVED_NO_MORE';
export const SET__SUCCESS_NO_MORE = 'SET_SUCCESS_NO_MORE';


export interface SetOffsetSuccessAction {
    type: typeof SET_OFFSET_SUCCESS;
    payload: number;
}

export interface SetOffsetRemovedAction {
    type: typeof SET_OFFSET_REMOVED;
    payload: number;
}

export interface SetOffsetCurrentAction {
    type: typeof SET_OFFSET_CURRENT;
    payload: number;
}

export interface SetOffsetReviewAction {
    type: typeof SET_OFFSET_REVIEW;
    payload: number;
}

export interface SetOffsetFoodAction {
    type: typeof SET_OFFSET_FOOD;
    payload: number;
}


export interface SetCurrentNoMore {
    type: typeof SET_CURRENT_NO_MORE;
    payload: boolean;
}


export interface SetRemovedNoMore {
    type: typeof SET__REMOVED_NO_MORE,
    payload: boolean
}

export interface SetSuccessNoMore {
    type : typeof SET__SUCCESS_NO_MORE,
    payload: boolean;
}

export interface LoadMoreInitialState {
    offSetSuccess: number;
    offSetRemoved: number;
    offSetCurrent: number;
    offSetReview: number;
    offSetFood: number;
    isMoreCurrent: boolean;
    isMoreSuccess: boolean;
    isMoreCancle: boolean;
}

export type LoadMoreActionTypes =
    | SetOffsetSuccessAction
    | SetOffsetRemovedAction
    | SetOffsetCurrentAction
    | SetOffsetReviewAction
    | SetOffsetFoodAction
    | SetCurrentNoMore
    | SetRemovedNoMore
    | SetSuccessNoMore


 
export const setOffsetSuccess = (offset: number): SetOffsetSuccessAction=> ({
    type: SET_OFFSET_SUCCESS,
    payload: offset,
});

export const setOffsetRemoved = (offset: number): SetOffsetRemovedAction => ({
    type: SET_OFFSET_REMOVED,
    payload: offset,
});

export const setOffsetCurrent = (offset: number): SetOffsetCurrentAction => ({
    type: SET_OFFSET_CURRENT,
    payload: offset,
});

export const setOffsetReview = (offset: number): SetOffsetReviewAction => ({
    type: SET_OFFSET_REVIEW,
    payload: offset,
});

export const setOffsetFood = (offset: number): SetOffsetFoodAction => ({
    type: SET_OFFSET_FOOD,
    payload: offset,
});

export const setNoMoreCurrent = (isMore: boolean): SetCurrentNoMore => ({
    type: SET_CURRENT_NO_MORE,
    payload: isMore
});
export const setRemoveNoMore = (isMore: boolean): SetRemovedNoMore => ({
    type: SET__REMOVED_NO_MORE,
    payload: isMore
});
export const setNoMoreSuccess = (isMore: boolean): SetSuccessNoMore => ({
    type: SET__SUCCESS_NO_MORE,
    payload: isMore
})