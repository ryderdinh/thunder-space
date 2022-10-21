import { actFetchStaffInfomation } from 'actions'
import Puff from 'assets/bower_components/SVG-Loaders/svg-loaders/puff.svg'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Component } from 'react'
import toast from 'react-hot-toast'
import { connect } from 'react-redux'
import { getCookie } from 'units/cookieWeb'
import { AccountButton } from '../../Button/AccountButton'
class AccountContainer extends Component {
  state = {
    variants: {
      hidden: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 }
        }
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      exit: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      }
    }
  }
  _onChangeFile = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    //? TOAST
    const errorToast = toast.error
    const successToast = toast.success

    const loadingToast = (content) => {
      toast.loading(content)
    }

    const removeToast = () => toast.remove(loadingToast())
    const formData = new FormData()
    formData.append('image', event.target.files[0])
    formData.append('upload_preset', 'HRMZeliosSea')
    const { id } = getCookie()

    try {
      loadingToast('Đang tải ảnh lên')
      // eslint-disable-next-line no-unused-vars
      let res = await axios({
        method: 'POST',
        url: `https://hrmadmin.herokuapp.com/upload/avatar/${id}`,
        data: formData,
        header: { 'Content-Type': 'multipart/form-data' }
      })

      removeToast()
      successToast('Tải ảnh thành công')
      this.props.actFetchStaffInfomation()
    } catch (error) {
      console.log(error)
      errorToast('Tải ảnh thất bại')
    }
  }

  get onChangeFile() {
    return this._onChangeFile
  }
  set onChangeFile(value) {
    this._onChangeFile = value
  }

  render() {
    const { user } = this.props
    return (
      <div className='account-container'>
        <div className='row'>
          <div className='col'>
            <div className='account_avatar'>
              {user.avatar === undefined ? (
                <img src={Puff} alt='profile' />
              ) : (
                <img src={user.avatar} alt='' />
              )}
              <div
                className='texture__action-avatar'
                onClick={() => {
                  this.upload.click()
                }}
              >
                <div className='texture__action-avatar__bg'></div>
                <img
                  src={require('assets/images/icons/wallpaper.svg').default}
                  alt='wallpaper'
                />
                <input
                  id='myInput'
                  type='file'
                  ref={(ref) => (this.upload = ref)}
                  style={{ display: 'none' }}
                  onChange={this.onChangeFile.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className='col'>
            <AccountButton content='Đổi mật khẩu' type='change-password' />
            <AccountButton content='Đăng xuất' type='signout' />
          </div>
        </div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_name'>
              <div className='label'>Họ tên</div>
              <div className='content'>{user.name}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_email'>
              <div className='label'>Email</div>
              <div className='content'>{user.email}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_birthday'>
              <div className='label'>Ngày sinh</div>
              <div className='content'>{user.birthday}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_nphone'>
              <div className='label'>Số điện thoại</div>
              <div className='content'>{user.phonenumber}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_position'>
              <div className='label'>Vị trí</div>
              <div className='content'>{user.position}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='row'
          variants={this.state.variants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <div className='col'>
            <div className='account_item account_department'>
              <div className='label'>Phòng ban</div>
              <div className='content'>{user.department}</div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state._staffInfomation._data
  }
}

// export default connect(mapStateToProps, null)(AccountContainer);

export default connect(mapStateToProps, { actFetchStaffInfomation })(
  AccountContainer
)
