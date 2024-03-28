const HomeLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden lg:block lg:w-1/2 xl:w-2/3">
        {' '}
        This will be the navbar
      </div>
      <div className="flex flex-col w-full">
        <div className="hidden lg:block lg:w-1/2 xl:w-2/3">
          {' '}
          This will be the sidebar
        </div>
        <div className="flex-grow">{children}</div>
        <div className="hidden lg:block lg:w-1/2 xl:w-2/3">
          {' '}
          This will be the footer
        </div>
      </div>
    </div>
  )
}

export default HomeLayout
