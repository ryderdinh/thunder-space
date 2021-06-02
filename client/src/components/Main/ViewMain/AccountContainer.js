import React from "react";
import { connect } from "react-redux";
import { actFetchStaffInfomation } from "../../../actions";
import AccountButton from "../Button/AccountButton";
class AccountContainer extends React.Component {
  componentDidMount() {
    this.props.actFetchStaffInfomation();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="account-container animate__animated animate__fadeIn">
        <div className="row">
          <div className="col">
            <div className="account_avatar">
              <img src="./images/icons/user.svg" alt="" />
            </div>
          </div>
          <div className="col">
            <AccountButton content="Đổi mật khẩu" type="change-password" />
            <AccountButton content="Đăng xuất" type="signout" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_name">
              <div className="label">Họ tên</div>
              <div className="content">{user.name}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_email">
              <div className="label">Email</div>
              <div className="content">{user.email}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_birthday">
              <div className="label">Ngày sinh</div>
              <div className="content">{user.birthday}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_nphone">
              <div className="label">Số điện thoại</div>
              <div className="content">{user.phonenumber}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_position">
              <div className="label">Vị trí</div>
              <div className="content">{user.position}</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="account_item account_department">
              <div className="label">Phòng ban</div>
              <div className="content">{user.department}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state._staffInfomation._staffInfomation,
  };
};

export default connect(mapStateToProps, { actFetchStaffInfomation })(
  AccountContainer
);
