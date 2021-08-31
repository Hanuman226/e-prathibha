import {
  FREE_EXAM_LIST_FAIL,
  FREE_EXAM_LIST_REQUEST,
  FREE_EXAM_LIST_SUCCESS,
  START_EXAM_FAIL,
  START_EXAM_REQUEST,
  START_EXAM_SUCCESS,
} from "../constants/examContants";

function examListReducer(state = {}, action) {
  switch (action.type) {
    case FREE_EXAM_LIST_REQUEST:
      return { loading: true };
    case FREE_EXAM_LIST_SUCCESS:
      return { loading: false, examsList: action.payload };

    case FREE_EXAM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function startExamReducer(state = {}, action) {
  switch (action.type) {
    case START_EXAM_REQUEST:
      return { loading: true };
    case START_EXAM_SUCCESS:
      return { loading: false, examData: action.payload };

    case START_EXAM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { examListReducer, startExamReducer };
