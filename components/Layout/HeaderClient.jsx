'use client'

import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'

const NAV_LINKS = [
  {
    label: 'Квартиры',
    href: '/apartments',
  },
  {
    label: 'ЖК Юннатов',
    href: '/unnatov',
  },
  {
    label: 'Построенные объекты',
    href: '/built-object',
  },
  {
    label: 'Новости',
    href: '/news',
  },
  {
    label: 'О компании',
    href: '/about',
  }
]

const CONTACTS = {
  phone: '+7 (8162) 62-38-00',
  mapUrl: 'https://yandex.ru/maps/-/CPRsqWy-',
  address: 'Менделеева, 16',
}

const HeaderClient = ({
  variant = 'default',
  isAdminAuthenticated = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isWhiteLogo = variant === 'white'

  const logo = isWhiteLogo ? '/logo2.svg' : '/logo.svg'
  const mobileLogo = isMenuOpen || isWhiteLogo ? '/logo2.svg' : '/logo.svg'
  const headerBackground = isWhiteLogo ? 'bg-[#4C4C4C]' : 'bg-header'
  const mobileBackground = isWhiteLogo ? 'bg-[#4C4C4C]' : 'bg-header'
  const logoClassName = isWhiteLogo ? 'h-14 lg:h-16' : 'h-6 lg:h-8'

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="container-padding my-4 px-4 lg:px-0">
      <header className="hidden w-full gap-6 lg:flex">
        <Link className="flex items-center" href="/">
          <img src={logo} alt="Логотип Глория" className={logoClassName} />
        </Link>

        <nav
          className={`
            flex w-full items-center justify-between rounded-4xl px-8 h-16
            ${headerBackground}
          `}
          aria-label="Основная навигация"
        >
          <div className="flex items-center gap-6 text-white">
            {NAV_LINKS.filter((link) => !link.mobileOnly).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="min-w-max transition-colors hover:text-white/75"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-white">
            {isAdminAuthenticated ? (
              <Link
                href="/g53-manager"
                className="min-w-max rounded-full bg-white/12 px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-dark"
              >
                Администратор
              </Link>
            ) : (
              <>
                <a
                  href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`}
                  className="min-w-max transition-colors hover:text-white/75"
                >
                  {CONTACTS.phone}
                </a>

                <a
                  href={CONTACTS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Адрес: ${CONTACTS.address}`}
                >
                  <img src="/pin_fill.svg" alt="" width={'40px'} className='m-1' />
                </a>
              </>
            )}
          </div>
        </nav>
      </header>

      <div className="lg:hidden">
        <div className="flex items-center justify-between">
          <Link className="relative z-30 flex items-center" href="/">
            <img
              src={mobileLogo}
              alt="Логотип Глория"
              className={`${logoClassName}  ${isMenuOpen ? 'h-12' : ''} transition-all duration-300`}
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="relative z-30 flex h-14 w-14 flex-col items-center justify-center gap-1.5 rounded-4xl bg-white p-2 transition active:scale-95"
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <span className="block h-0.5 w-6 bg-header" />
            <span className="block h-0.5 w-6 bg-header" />
            <span className="block h-0.5 w-6 bg-header" />
          </button>
        </div>

        <Transition show={isMenuOpen} as={Fragment}>
          <Dialog onClose={closeMenu} className="relative z-20 lg:hidden">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={`fixed inset-0 ${mobileBackground}`} aria-hidden="true" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 -translate-y-full"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-full"
            >
              <DialogPanel className="fixed inset-0 overflow-y-auto px-6 pb-8 pt-36">
                <DialogTitle className="sr-only">
                  Меню сайта
                </DialogTitle>

                <nav className="mb-8 flex flex-col gap-2 text-white" aria-label="Мобильная навигация">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="border-b border-white/20 py-3 text-lg transition-colors hover:text-white/75"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-4 text-white">
                  {isAdminAuthenticated ? (
                    <Link
                      href="/g53-manager"
                      className="text-lg font-medium"
                      onClick={closeMenu}
                    >
                      Администратор
                    </Link>
                  ) : (
                    <>
                      <a
                        href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`}
                        className="text-lg font-medium"
                        onClick={closeMenu}
                      >
                        {CONTACTS.phone}
                      </a>

                      <a
                        href={CONTACTS.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2"
                        onClick={closeMenu}
                      >
                        <img src="/pin_fill.svg" alt="" className="h-8 w-8" />
                        <span>{CONTACTS.address}</span>
                      </a>
                    </>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>
      </div>
    </div>
  )
}

export default HeaderClient
