function Col({ className = '', children }) {
  return <div className={`col ${className}`}>{children}</div>
}

export default Col
