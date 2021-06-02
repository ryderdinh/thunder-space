const side_item_name = ["Trang chủ", "Bảng chấm công","Báo cáo"];

export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_MENUS":
      return side_item_name;
    default:
      return state;
  }
};
