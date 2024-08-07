'use client';
import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  BookOpenIcon,
  FolderIcon,
  FolderOpenIcon,
  ChartBarSquareIcon,
  FolderPlusIcon,
} from '@heroicons/react/24/outline';
import DeckIcon from '../deck/deck-icon';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Learn', href: '/learn', icon: BookOpenIcon },
  { name: 'Decks', href: '/learn/decks', icon: FolderIcon },
  { name: 'Activity', href: '/learn/activity', icon: ChartBarSquareIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 mb-6  p-3 text-sm font-medium  hover:text-teal-500 md:flex-none  ',
              {
                ' text-teal-500 ': pathname === link.href,
              },
            )} >
            <div className='flex flex-col items-center'>

            <LinkIcon className=" w-6" />
            <p className="hidden md:block">{link.name}</p>
            
            </div>
          </Link>
        );
      })}
    </>
  );
}
