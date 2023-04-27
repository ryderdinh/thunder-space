const Content = ({ title, more, description, data, children }) => {
  return (
    <div className=''>
      <div className=''>
        <h1>{title}</h1>
        <p>{more}</p>
      </div>
      <div className=''>
        <p>{description}</p>
        {data.map(({ title, content }) => (
          <div className=''>
            <h2>{title}</h2>
            <div>
              {content.map((text) => (
                <p>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className=''>{children}</div>
    </div>
  )
}

export default Content
