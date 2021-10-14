const initState = {
  _dataProject: [],
};

export default function project(state = initState, action) {
  switch (action.type) {
    case "SET_DATA_PROJECT":
      return { ...state, _dataProject: action.payload };
    case "SET_INITAL_PROJECT": {
      return { ...state, _dataProject: [] };
    }
    default:
      return { ...state };
  }
}

// {
//   pid: "jjjefnjnjkef",
//   projectCode: "cdk",
//   projectName: "TestPJ",
//   projectManager: [{ uid: "vsrbkhjv", username: "Quang Anh" }],
//   projectMember: [
//     { uid: "vsrbkhjv", username: "Quang Anh" },
//     { uid: "wdwdkhjv", username: "Quoc Anh" },
//   ],
//   projectIssue: [
//     {
//       iid: "bhefkjek",
//       issueCode: "cdk-12",
//       issueName: "Tạo trang đăng nhập cho ứng dụng zxs",
//       issueDescription: ``,
//       issueType: "task",
//       issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
//       issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
//       issueTime: {
//         start: { hour: "12:00 CH", date: "11/20/2021" },
//         end: { hour: "14:00 CH", date: "11/20/2021" },
//         set: { hour: "11:00 AM", date: "11/20/2021" },
//       },
//       issuePriority: "Medium",
//       issueAttackment: "",
//       issueComment: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           comment:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//         },
//       ],
//       issueStatus: "done",
//       issueHistory: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           action: "change",
//           from: "",
//           to: "",
//         },
//       ],
//     },
//     {
//       iid: "bhefksddd",
//       issueCode: "cdk-2",
//       issueName: "Test trang đăng nhập cho ứng dụng zxs",
//       issueDescription: ``,
//       issueType: "task",
//       issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
//       issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
//       issueTime: {
//         start: { hour: "12:00 CH", date: "11/20/2021" },
//         end: { hour: "14:00 CH", date: "11/20/2021" },
//         set: { hour: "11:00 AM", date: "11/20/2021" },
//       },
//       issuePriority: "Medium",
//       issueAttackment: "",
//       issueComment: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           comment:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//         },
//       ],
//       issueStatus: "done",
//       issueHistory: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           action: "change",
//           from: "",
//           to: "",
//         },
//       ],
//     },
//   ],
// },
// {
//   pid: "kejsjesfjkjkesf",
//   projectCode: "ff",
//   projectName: "TestPJ1",
//   projectManager: [{ uid: "vsrbkhjv", username: "Quang Anh" }],
//   projectMember: [
//     { uid: "vsrbkhjv", username: "Quang Anh" },
//     { uid: "wdwdkhjv", username: "Quoc Anh" },
//   ],
//   projectIssue: [
//     {
//       iid: "bhefkjek",
//       issueCode: "ff-12",
//       issueName: "Lỗi trang đăng nhập cho ứng dụng zxs",
//       issueDescription: ``,
//       issueType: "bug",
//       issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
//       issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
//       issueTime: {
//         start: { hour: "12:00 CH", date: "11/20/2021" },
//         end: { hour: "14:00 CH", date: "11/20/2021" },
//         set: { hour: "11:00 AM", date: "11/20/2021" },
//       },
//       issuePriority: "Medium",
//       issueAttackment: "",
//       issueComment: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           comment:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//         },
//       ],
//       issueStatus: "done",
//       issueHistory: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           action: "change",
//           from: "",
//           to: "",
//         },
//       ],
//     },
//     {
//       iid: "bhefkjsdsek",
//       issueCode: "ff-2",
//       issueName: "Xoá trang đăng nhập cho ứng dụng zxs",
//       issueDescription: ``,
//       issueType: "task",
//       issueCreator: { uid: "vsrbkhjv", username: "Quang Anh" },
//       issueAssign: { uid: "wdwdkhjv", username: "Quoc Anh" },
//       issueTime: {
//         start: { hour: "12:00 CH", date: "11/20/2021" },
//         end: { hour: "14:00 CH", date: "11/20/2021" },
//         set: { hour: "11:00 AM", date: "11/20/2021" },
//       },
//       issuePriority: "Medium",
//       issueAttackment: "",
//       issueComment: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           comment:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
//         },
//       ],
//       issueStatus: "done",
//       issueHistory: [
//         {
//           time: "12:00,11/20/2021",
//           username: "Quang Anh",
//           action: "change",
//           from: "",
//           to: "",
//         },
//       ],
//     },
//   ],
// },
