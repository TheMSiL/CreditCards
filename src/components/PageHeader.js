import { NavLink } from 'react-router-dom'

const PageHeader = ({title, to, styleName, linkTitle}) => {
  return (
    <header className='header'>
      <h1 className='page-title'>{title}</h1>
      <NavLink to={to} className={styleName}>
        {linkTitle}
      </NavLink>
    </header>
  )
}

export default PageHeader