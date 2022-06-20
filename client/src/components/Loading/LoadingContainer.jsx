import BallTriangle from './BallTriangle'

export default function LoadingContainer() {
  return (
    <div className='loading-container flex h-screen w-full items-center justify-center'>
      <BallTriangle w={40} h={40} stroke={'#059669'} />
    </div>
  )
}
