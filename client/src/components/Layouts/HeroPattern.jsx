import GridPattern from './GridPattern'

function HeroPattern() {
  return (
    <div className='absolute inset-0 -z-10 mx-0 max-w-none overflow-hidden'>
      <div className='absolute left-0 top-0 h-[25rem] w-full [mask-image:linear-gradient(white,transparent)]'>
        <div className='absolute inset-0 bg-gradient-to-r from-emerald-500/40 to-sky-500/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]'>
          <GridPattern
            width={72}
            height={56}
            x='-12'
            y='4'
            squares={[
              [4, 3],
              [2, 1],
              [7, 3],
              [10, 6]
            ]}
            className='fill-white/2.5 absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/30 stroke-white/5 mix-blend-overlay'
          />
        </div>
        <svg
          viewBox='0 0 1113 440'
          aria-hidden='true'
          className='absolute top-0 left-1/2 ml-[-19rem] hidden w-[69.5625rem] fill-white blur-[26px]'
        >
          <path d='M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z' />
        </svg>
      </div>
    </div>
  )
}

export default HeroPattern
