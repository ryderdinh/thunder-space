const side_item_name = ["Trang chủ", "Bảng chấm công","Báo cáo","Quản lý công việc"];

export default function menuReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_MENUS":
      return side_item_name;
    default:
      return state;
  }
};
