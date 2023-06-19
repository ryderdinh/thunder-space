import Content from './Content'
import Navigation from './Navigation'

const LegalDocumentLayout = ({active, data,children}) => {
  return (
    <div className='relative mx-auto flex w-full max-w-[1000px] text-white'>
      <Navigation active={active}/>
      <Content>{children} </Content>
    </div>
  )
}

export default LegalDocumentLayout
