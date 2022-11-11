import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CloudUploadIcon, XIcon } from '@heroicons/react/solid'
import ButtonSuccess from 'components/Button/ButtonSuccess'
import { getClassWithColor } from 'file-icons-js'
import 'file-icons-js/css/style.css'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import formatBytes from 'utilities/formatBytes'
import { v4 as uuidv4 } from 'uuid'

const IssueFiles = ({
  className = '',
  onClick,
  data,
  onFileChange,
  upload
}) => {
  const wrapperRef = useRef(null)
  const fileRef = useRef(null)
  const [filesImportRef] = useAutoAnimate()

  const [fileList, setFileList] = useState([])
  console.log(fileList)

  const onDragEnter = (e) => {
    wrapperRef.current.classList.add('bg-neutral-600')
    fileRef.current.classList.add('z-10')
  }
  const onDragLeave = () => {
    wrapperRef.current.classList.remove('bg-neutral-600')
    fileRef.current.classList.remove('z-10')
  }
  const onDrop = (e) => {
    wrapperRef.current.classList.remove('bg-neutral-600')
    fileRef.current.classList.remove('z-10')
  }
  const onFileDrop = (e) => {
    let file = e.target.files[0]
    const fileData = { file, id: uuidv4() }
    if (file) {
      setFileList([...fileList, fileData])
      onFileChange([...fileList, fileData])
    }
  }
  const removeFile = (index) => {
    const newFileList = [...fileList]
    newFileList.splice(index, 1)
    setFileList(newFileList)
    onFileChange(newFileList)
  }

  return (
    <div className={`${className} w-full space-y-4 text-sm text-neutral-50`}>
      {(!data || !data?.length) && (
        <p className='w-full py-14 text-center text-xs text-neutral-500'>
          No files
        </p>
      )}

      <div
        ref={wrapperRef}
        className={`relative mt-1 flex w-full justify-center 
        rounded-md border-2 border-dashed border-neutral-500 px-6 
        pt-5 pb-6 transition-all duration-200 ease-in-out hover:bg-neutral-600`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          id='file-upload'
          name='file-upload'
          type='file'
          accept='image/*,.doc,.pdf'
          className='absolute top-0 left-0 h-full w-full cursor-pointer opacity-0'
          onChange={onFileDrop}
          ref={fileRef}
        />
        <div className='relative space-y-1 text-center'>
          <CloudUploadIcon className='m-auto h-10 w-10 text-neutral-300' />
          <div className='flex text-sm text-neutral-500'>
            <label
              htmlFor='file-upload'
              className='relative cursor-pointer rounded-md
              font-medium text-emerald-600 focus-within:outline-none
              hover:text-emerald-500'
            >
              <span>Upload a file</span>
            </label>
            <p className='pl-1'>or drag and drop</p>
          </div>
          <p className='text-xs text-neutral-400'>IMAGE, PDF, DOC up to 10MB</p>
        </div>
      </div>

      {fileList.length > 0 && (
        <div className='space-y-3'>
          <h5 className='text-base font-bold text-neutral-300'>
            Ready to upload
          </h5>

          <div className='grid grid-cols-2 gap-4' ref={filesImportRef}>
            {fileList.map(({ file, id }, index) => (
              <div
                key={id}
                className='relative col-span-1 rounded-md bg-neutral-700 
                py-3 px-3'
              >
                <div className='flex items-center space-x-2'>
                  <div className='flex-shrink-0'>
                    {/* <img
                      src={URL.createObjectURL(file)}
                      alt='icon file'
                      className='h-9 w-9 object-cover'
                    /> */}
                    <div className='h-9 w-9'>
                      <div className='skew-x-2'>
                        <div className='skew-x-12 text-center'>
                          <i
                            className={`!leading-9 before:!text-[30px] ${getClassWithColor(
                              file.name
                            )}`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-[calc(100%-6rem)] space-y-1'>
                    <p
                      className='w-full text-sm text-neutral-400 
                      line-clamp-1'
                    >
                      {file.name}
                    </p>
                    <p className='text-xs text-neutral-400/80'>
                      Size: {formatBytes(file.size)}
                    </p>
                  </div>
                </div>

                <div
                  className='absolute top-0 right-3 flex h-full items-center
                  justify-center'
                >
                  <div
                    className='group flex h-8 w-8 cursor-pointer items-center 
                    justify-center rounded-full bg-neutral-600 transition-all 
                    duration-200 ease-linear hover:bg-neutral-400'
                    onClick={() => removeFile(index)}
                  >
                    <XIcon
                      className='h-4 w-4 text-neutral-300 
                      transition-all duration-200 ease-linear 
                      group-hover:text-neutral-50'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-center'>
            <ButtonSuccess onClick={upload}>Upload to cloud</ButtonSuccess>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueFiles

IssueFiles.protoTypes = {
  onFileChange: PropTypes.func,
  upload: PropTypes.func
}
