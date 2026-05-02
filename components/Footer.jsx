'use client'

import { useState } from 'react'
import Button from '@/components/UI/Button'

const FOOTER_SECTIONS = [
  {
    id: 'apartments',
    title: 'Квартиры',
    links: [
      { label: 'Новостройки', href: '/apartments' },
      { label: 'Студии', href: '/apartments' },
      { label: '1-комнатные', href: '/apartments' },
      { label: '2-комнатные', href: '/apartments' },
      { label: '3-комнатные', href: '/apartments' },
      { label: 'Квартиры со скидкой', href: '/apartments' },
    ],
  },
  {
    id: 'info',
    title: 'Информация',
    links: [
      { label: 'Новости', href: '#' },
      { label: 'Акции', href: '#' },
      { label: 'О компании', href: '#' },
      { label: 'Построенные объекты', href: '#' },
    ],
  },
  {
    id: 'contacts',
    title: 'Связь с нами',
    links: [
      { label: 'Отдел продаж: +7 (8162) 62-38-00', href: 'tel:+78162623800' },
      { label: 'Адрес: Менделеева, 16', href: 'https://yandex.ru/maps/-/CPRsqWy-' },
      { label: 'Режим работы: пн–пт, 8:00–17:00', href: '#' },
    ],
  },
  {
    id: 'projects',
    title: 'Проекты',
    links: [
      { label: 'ЖК Юннатов', href: '/unnatov' },
      { label: 'ЖК Раздолье', href: '#' },
      { label: 'ЖК Шелонская', href: '#' },
      { label: 'ул. Речная, д. 10', href: '#' },
      { label: 'Б. Санкт-Петербургская, д. 98', href: '#' },
      { label: 'Больше проектов', href: '#' },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    label: 'ВКонтакте',
    href: '#',
    icon: '/vk.svg',
  },
  {
    label: 'Telegram',
    href: '#',
    icon: '/tg.svg',
  },
]

const FooterColumn = ({ title, links }) => {
  return (
    <div className="grid content-start gap-3">
      <h3 className="text-sm font-medium text-white">
        {title}
      </h3>

      <nav className="grid gap-2" aria-label={title}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm leading-relaxed text-twopart transition hover:text-white"
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

const FooterAccordion = ({
  section,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-white"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{section.title}</span>

        <svg
          className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <nav className="grid gap-2" aria-label={section.title}>
            {section.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-1 text-sm leading-relaxed text-twopart transition hover:text-white"
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

const FooterContacts = () => {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <h3 className="text-white">
          По вопросам и предложениям
        </h3>

        <p className="max-w-sm text-sm leading-relaxed text-twopart">
          Входящие звонки принимаются с 8:00 до 12:00 и с 13:00 до 17:00.
          Суббота и воскресенье — выходные.
        </p>
      </div>

      <div className="grid gap-3 sm:flex">
        <Button
          text="Сообщение"
          size="sm"
          variant="accent"
        />

        <Button
          text="+7 (8162) 62-38-00"
          size="sm"
          variant="white"
          linkToPage="tel:+78162623800"
        />
      </div>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div className="grid gap-3">
      <span className="text-sm font-medium text-white">
        Наши соцсети
      </span>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
          >
            <img
              src={social.icon}
              alt=""
              className="h-6 w-6"
            />
          </a>
        ))}
      </div>
    </div>
  )
}

const FooterLegal = () => {
  return (
    <div className="grid gap-4 text-sm leading-relaxed text-dark40">
      <p>
        © ООО «Глория», строительная компания, 1999–2026
      </p>

      <p>
        Строительство и продажа квартир в Великом Новгороде.
        Информация, размещённая на сайте, носит справочный характер
        и не является публичной офертой.
      </p>
    </div>
  )
}

const Footer = () => {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="container-padding my-8">
      <footer className="rounded-4xl bg-header p-6 sm:p-8 lg:p-12 xl:p-16">
        {/* Desktop */}
        <div className="hidden gap-10 lg:grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] xl:gap-14">
          <div className="grid content-between gap-12">
            <div className="grid gap-12">
              <img
                src="/logo2.svg"
                alt="Логотип Глория"
                className="h-auto w-fit"
              />

              <FooterContacts />
            </div>

            <FooterLegal />
          </div>

          <div className="grid content-start gap-8">
            <FooterColumn {...FOOTER_SECTIONS[0]} />
            <FooterColumn {...FOOTER_SECTIONS[1]} />
            <FooterSocials />
          </div>

          <div className="grid content-start gap-8">
            <FooterColumn {...FOOTER_SECTIONS[3]} />
          </div>

          <div className="grid content-start gap-8">
            <FooterColumn {...FOOTER_SECTIONS[2]} />
          </div>

        </div>

        {/* Mobile / Tablet */}
        <div className="lg:hidden">
          <div className="grid gap-8">
            <div>
              <img
                src="/logo2.svg"
                alt="Логотип Глория"
                className="mb-8 h-auto w-fit"
              />

              <FooterContacts />
            </div>

            <div>
              {FOOTER_SECTIONS.map((section) => (
                <FooterAccordion
                  key={section.id}
                  section={section}
                  isOpen={Boolean(openSections[section.id])}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>

            <FooterSocials />

            <FooterLegal />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer