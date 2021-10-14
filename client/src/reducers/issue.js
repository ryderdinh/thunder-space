const initState = {
  _dataIssue: {
    projectCode: "ff",
    projectName: "TestPJ",
    issueData: {
      iid: "bhefkjek",
      issueCode: "ff-1",
      issueName: "Tạo trang đăng nhập cho ứng dụng zxs",
      issueDescription: ``,
      issueType: "task",
      issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
      issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
      issueTime: {
        start: { hour: "12:00 CH", date: "11/20/2021" },
        end: { hour: "14:00 CH", date: "11/20/2021" },
        set: { hour: "11:00 AM", date: "11/20/2021" },
      },
      issuePriority: "Medium",
      issueAttackment: "",
      issueComment: [
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          time: "12:00,11/20/2021",
          username: "Quốc Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          time: "12:00,11/20/2021",
          username: "Quốc Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        },
      ],
      issueStatus: "done",
      issueHistory: [
        {
          time: "12:00,11/20/2021",
          username: "Quang Anh",
          action: "change",
          from: "",
          to: "",
        },
      ],
    },
  },
};

export default function issue(state = initState, action) {
  switch (action.type) {
    case "SET_DATA_ISSUE":
      return { ...state, _dataIssue: action.payload };

    default:
      return { ...state };
  }
}
