function Row({ className = '', children }) {
  return <div className={`relative w-full ${className}`}>{children}</div>
}

export default Row
