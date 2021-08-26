import { FREE_EXAM_LIST_FAIL, FREE_EXAM_LIST_REQUEST, FREE_EXAM_LIST_SUCCESS } from "../constants/examContants";

  function examListReducer(state = {}, action) {
    switch (action.type) {
      case FREE_EXAM_LIST_REQUEST:
        return { loading: true };
      case FREE_EXAM_LIST_SUCCESS:
        return { loading: false, freeExamList: action.payload };
  
      case FREE_EXAM_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  
  export {examListReducer};
  