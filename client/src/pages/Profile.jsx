import { actFetchStaffInfomation } from 'actions'
import { userApi } from 'api'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { ProtectedLayout } from 'components/Layouts'
import { Spinner } from 'components/Loading/Spinner'
import ViewBox from 'components/Main/ViewMain/ViewBox'
import { LayoutContext } from 'context/LayoutContext'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorToast, successToast } from 'utilities/toast'

const path = 'account'

export default function Profile() {
  const { openDialog } = useContext(LayoutContext)

  const { _data: profile } = useSelector((state) => state._staffInfomation)
  const dispatch = useDispatch()

  const imageInputRef = useRef()
  const imageElmRef = useRef()

  const [selectedFiles, setSelectedFiles] = useState(undefined)
  const [uploadingImage, setUploadingImage] = useState(false)

  const fetchInformation = useCallback(() => {
    dispatch(actFetchStaffInfomation())
  }, [dispatch])

  const changeFile = () => {
    imageInputRef.current.click()
  }

  const selectFile = async (event) => {
    setSelectedFiles(event.target.files)
    let reader = new FileReader()

    reader.onload = function (e) {
      imageElmRef.current.src = e.target.result
    }
    // Add to image
    reader.readAsDataURL(event.target.files[0])
    // Upload file
    await uploadImage(event.target.files[0])
  }

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    setUploadingImage(true)
    try {
      await userApi.updateAvatar(formData)

      successToast('Success', 'update-avatar')
      setSelectedFiles(undefined)
    } catch (error) {
      console.error(error)
      errorToast('Invalid photo!', 'update-avatar')
    } finally {
      fetchInformation()
      setUploadingImage(false)
    }
  }

  useEffect(() => {
    fetchInformation()
  }, [fetchInformation])

  return (
    <ProtectedLayout path={path}>
      <ViewBox className='!py-5'>
        <div className='w-full md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-neutral-200'>
                Avatar
              </h3>
              <p className='mt-1 text-sm text-neutral-300'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='card-panel space-y-6 px-4 py-5 sm:p-6'>
                  <div className='flex flex-col items-center'>
                    <label className='block text-sm font-medium text-neutral-200'>
                      Photo
                    </label>
                    <span
                      className='group relative mb-3 mt-5 inline-block 
                          overflow-hidden rounded-full border-2 border-emerald-500
                          bg-neutral-100'
                    >
                      <img
                        src={profile.avatar}
                        alt='staff-avatar'
                        className='z-1 relative aspect-square h-32 cursor-pointer object-cover'
                        ref={imageElmRef}
                        onClick={changeFile}
                      />
                      <input
                        type='file'
                        accept='image/*'
                        ref={imageInputRef}
                        className='hidden'
                        onChange={selectFile}
                      />

                      <div
                        className={`absolute left-0 top-0 flex h-full w-full items-center 
                            justify-center bg-emerald-500/40 transition-all duration-200 
                            ease-linear ${
                              !uploadingImage
                                ? 'invisible z-[-1] opacity-0'
                                : 'visible z-[3] opacity-100'
                            }`}
                      >
                        <Spinner color='#10ffb9' w={20} border={4} />
                      </div>
                      <div
                        className={`invisible absolute left-0 top-0 z-[-1] flex h-full 
                            w-full cursor-pointer items-center justify-center bg-emerald-500/40 
                            p-3 text-center text-xs font-bold text-neutral-100 opacity-0
                            transition-all duration-200 ease-linear
                            ${
                              uploadingImage
                                ? ''
                                : 'group-hover:visible group-hover:z-[2] group-hover:opacity-100'
                            }`}
                        onClick={changeFile}
                      >
                        Change <br /> avatar
                      </div>
                    </span>
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
                <p className='mt-1 text-sm text-neutral-300'></p>
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
                          Email
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
    </ProtectedLayout>
  )
}
