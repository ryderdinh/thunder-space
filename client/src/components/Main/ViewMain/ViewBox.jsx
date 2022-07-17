export default function ViewBox({
  children,
  className = '',
  classNameCol = ''
}) {
  return (
    <div className={`row view-box ${className}`}>
      <div className={`col ${classNameCol}`}>{children}</div>
    </div>
  )
}
