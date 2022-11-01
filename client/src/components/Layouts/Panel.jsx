const Panel = ({ children, className }) => {
  return (
    <div className={`panel rounded ${className}`} style={{ padding: 0 }}>
      {children}
    </div>
  )
}

export default Panel
