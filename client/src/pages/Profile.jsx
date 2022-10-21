import { actFetchStaffInfomation } from 'actions'
import { userApi } from 'api'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import Layout from 'components/Layouts/Layout'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { successToast } from 'utilities/toast'

const path = 'account'

export default function Profile() {
  const { openDialog } = useContext(LayoutContext)

  const { _data: profile } = useSelector((state) => state._staffInfomation)
  const dispatch = useDispatch()

  const imageInputRef = useRef()
  const imageElmRef = useRef()

  const [selectedFiles, setSelectedFiles] = useState(undefined)

  const changeFile = () => {
    imageInputRef.current.click()
  }

  const selectFile = (event) => {
    setSelectedFiles(event.target.files)
    let reader = new FileReader()

    reader.onload = function (e) {
      imageElmRef.current.src = e.target.result
    }

    reader.readAsDataURL(event.target.files[0])
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append('image', selectedFiles[0])
    formData.append('upload_preset', 'HRMZeliosSea')

    try {
      await userApi.updateAvatar(formData)

      successToast('Success')
      setSelectedFiles(undefined)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dispatch(actFetchStaffInfomation())
  }, [dispatch])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>
          <ViewBox>
            <div className='w-full md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-lg font-medium leading-6 text-neutral-200'>
                    Avatar
                  </h3>
                  <p className='mt-1 text-sm text-neutral-300'>
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                </div>
              </div>
              <div className='mt-5 md:col-span-2 md:mt-0'>
                <form>
                  <div className='shadow sm:overflow-hidden sm:rounded-md'>
                    <div className='card-panel space-y-6 px-4 py-5 sm:p-6'>
                      <div>
                        <label className='block text-sm font-medium text-neutral-200'>
                          Photo
                        </label>
                        <div className='mt-1 flex items-center'>
                          <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-neutral-100'>
                            <img
                              src={profile.avatar}
                              alt='staff-avatar'
                              ref={imageElmRef}
                              className='h-full w-full object-cover'
                            />
                            <input
                              type='file'
                              ref={imageInputRef}
                              className='hidden'
                              onChange={selectFile}
                            />
                          </span>
                          <ButtonSuccess
                            className={'ml-2'}
                            onClick={changeFile}
                          >
                            Choose image
                          </ButtonSuccess>
                          <ButtonSuccess
                            className={'ml-2'}
                            disabled={!selectedFiles}
                            onClick={uploadImage}
                          >
                            Change
                          </ButtonSuccess>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className='w-full'>
              <div className='py-5'>
                <div className='border-t border-neutral-800' />
              </div>
            </div>

            <div className='mt-10 w-full sm:mt-0'>
              <div className='md:grid md:grid-cols-3 md:gap-6'>
                <div className='md:col-span-1'>
                  <div className='px-4 sm:px-0'>
                    <h3 className='text-lg font-medium leading-6 text-neutral-200'>
                      Personal Information
                    </h3>
                    <p className='mt-1 text-sm text-neutral-300'>
                      Use a permanent address where you can receive mail.
                    </p>
                  </div>
                </div>

                <div className='mt-5 md:col-span-2 md:mt-0'>
                  <form action='#' method='POST'>
                    <div className='overflow-hidden shadow sm:rounded-md'>
                      <div className='card-panel px-4 py-5 sm:p-6'>
                        <div className='grid grid-cols-6 gap-6'>
                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='name'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Full name
                            </label>
                            <input
                              name='name'
                              defaultValue={profile.name}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='email'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Main
                            </label>
                            <input
                              name='email'
                              defaultValue={profile.email}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-2'>
                            <label
                              htmlFor='sex'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Sex
                            </label>
                            <input
                              name='sex'
                              defaultValue={''}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-2'>
                            <label
                              htmlFor='birthday'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Birthday
                            </label>
                            <input
                              name='birthday'
                              defaultValue={profile.birthday}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-2'>
                            <label
                              htmlFor='phonenumber'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Phone number
                            </label>
                            <input
                              name='phonenumber'
                              defaultValue={profile.phonenumber}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='department'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Department
                            </label>
                            <input
                              name='department'
                              defaultValue={profile.department}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='position'
                              className='block text-sm font-medium text-neutral-300'
                            >
                              Position
                            </label>
                            <input
                              name='position'
                              defaultValue={profile.position}
                              disabled
                              className='mt-1 block w-full rounded-md border border-neutral-300 
                              p-2 text-neutral-400 shadow-sm focus:border-emerald-500 
                              focus:outline-none focus:ring-2 focus:ring-emerald-500 
                              disabled:border-neutral-600 disabled:bg-neutral-700 sm:text-sm'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className='w-full'>
              <div className='py-5'>
                <div className='border-t border-neutral-800' />
              </div>
            </div>

            <div className='mt-10 w-full sm:mt-0'>
              <div className='md:grid md:grid-cols-3 md:gap-6'>
                <div className='md:col-span-1'>
                  <div className='px-4 sm:px-0'>
                    <h3 className='text-lg font-medium leading-6 text-neutral-200'>
                      Account setting
                    </h3>
                    <p className='mt-1 text-sm text-neutral-300'>
                      Change password, notification,...
                    </p>
                  </div>
                </div>

                <div className='mt-5 md:col-span-2 md:mt-0'>
                  <form>
                    <div className='shadow sm:overflow-hidden sm:rounded-md'>
                      <div className='card-panel space-y-6 px-4 py-5 sm:p-6'>
                        <div>
                          <label className='block text-sm font-medium text-neutral-200'>
                            Password
                          </label>
                          <div className='mt-1 flex items-center'>
                            <ButtonSuccess
                              onClick={() => {
                                openDialog('change-password')
                              }}
                            >
                              Change password
                            </ButtonSuccess>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ViewBox>
        </ViewMain>
      </Main>
    </Layout>
  )
}
