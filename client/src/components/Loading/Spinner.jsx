export const Spinner = ({ w = 40, color = '#474bff', border = 6.4 }) => {
  return (
    <div
      className={`spinner`}
      style={{
        width: `${w}px`,
        height: `${w}px`,
        borderWidth: `${border}px`,
        borderRightColor: color
      }}
    ></div>
  )
}
