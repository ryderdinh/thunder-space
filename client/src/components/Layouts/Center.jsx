const Center = ({ children, className = '', onClick }) => (
  <div
    className={`flex items-center justify-center ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

export default Center
