function runFunction(func, ...props) {
  if (func) {
    func(...props)
  }
}

export default runFunction
