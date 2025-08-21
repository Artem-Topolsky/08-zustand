import Link from 'next/link';
import css from './Header.module.css';
import { Routes } from '@/path/routes';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href={Routes.Home} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={Routes.Home}>Home</Link>
          </li>
          <li>
            <Link href={Routes.Notes}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
