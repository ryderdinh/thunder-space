export default function Tag({ children, bg, onClick }) {
  return (
    <div
      className={`rounded-md ${bg} inline-block cursor-pointer px-2 
      py-1 text-sm text-neutral-50`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
