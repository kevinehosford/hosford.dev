import { Link } from '@tanstack/react-router';
import { Nav } from '@/components/Nav';
import { NavItem } from '@/components/NavItem';
import { NavList } from '@/components/NavList';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const PrimaryNav = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <Link
            to="/log"
            className="no-style"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'no-style font-semibold' }}
            inactiveProps={{ className: 'no-style' }}
          >
            dev log
          </Link>
        </NavItem>
        <NavItem>
          <Link
            to="/blog"
            className="no-style"
            activeOptions={{ exact: false }}
            activeProps={{ className: 'no-style font-semibold' }}
            inactiveProps={{ className: 'no-style' }}
          >
            blog
          </Link>
        </NavItem>
        <NavItem>
          <ThemeSwitcher />
        </NavItem>
      </NavList>
    </Nav>
  );
};
