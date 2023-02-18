export default function Logo({ className }) {
  return (
    <img
      src={require('assets/images/icons/newlogo-logo.svg').default}
      alt='logo'
      className={`${className}`}
    />
  )
}
