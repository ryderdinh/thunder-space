function Row({ className = '', children }) {
  return <div className={`row w-full ${className}`}>{children}</div>
}

export default Row
