const initialState = {
  _workflowHeader: {
    workflowName: "Tất cả",
    workflowType: "",
    workflowId: "",
  },
};

export default function workflow(state = initialState, action) {
  switch (action.type) {
    case "SET_WORKFLOW":
      return { ...state, _workflowHeader: action.payload };

    default:
      return { ...state };
  }
}
