import { forwardRef } from 'react'
import { Link } from 'react-router-dom';

const NavLink = forwardRef(({ href, children, ...prop }, ref) => (
  <Link ref={ref} to={href} {...prop}>
    {children}
  </Link>
));

export default NavLink