import { Nav } from '@/components/Nav';
import { NavItem } from '@/components/NavItem';
import { NavList } from '@/components/NavList';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const PrimaryNav = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <ThemeSwitcher />
        </NavItem>
      </NavList>
    </Nav>
  );
};
