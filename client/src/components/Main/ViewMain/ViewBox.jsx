export default function ViewBox({
  children,
  className = '',
  classNameCol = ''
}) {
  return (
    <div className={`row view-box ${className}`}>
      <div className={`col ${classNameCol} px-5 md:pl-[25px] md:pr-[20px]`}>
        {children}
      </div>
    </div>
  )
}
