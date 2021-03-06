import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { PillButton } from '../Elements/Button'
import { Fragment } from 'react'
import LocaleSwitcher from '../LocaleSwitcher'
import { FormattedMessage } from 'react-intl'

const navigation = [
  { key: 'studio', href: '/studio' },
  { key: 'faq', href: '/faq' },
]

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
    <Disclosure as="nav" className="border-b-2 border-zinc-800 bg-zinc-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">
                    <FormattedMessage id="navbar.openMenu" />
                  </span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/'} passHref>
                    <a>
                      <div className="relative block h-8 w-20 lg:hidden">
                        <Image
                          src={require('assets/logos/request-logo-single.svg')}
                          alt="Logo simple"
                          layout="fill"
                        />
                      </div>
                      <div className="relative hidden h-8 w-28 lg:block">
                        <Image
                          src={require('assets/logos/request-logo.svg')}
                          alt="Logo"
                          layout="fill"
                        />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link key={item.key} href={item.href}>
                        <a
                          className={clsx(
                            router.pathname.includes(item.href)
                              ? 'bg-slate-800 text-white'
                              : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={
                            router.pathname.includes(item.href)
                              ? 'page'
                              : undefined
                          }
                        >
                          <FormattedMessage id={'navbar.' + item.key} />
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session && (
                  <Link href={'/api/auth/signin'} passHref>
                    <PillButton className="mx-auto" variant="tertiary">
                      Login
                    </PillButton>
                  </Link>
                )}

                {session && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gradient-to-br from-flamingo via-purple-500 to-dodger-blue ring-2 ring-slate-200 ring-offset-2 ring-offset-slate-800">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full font-semibold uppercase">
                          <p>{session?.user?.email?.substring(0, 2)}</p>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded bg-zinc-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={clsx(
                                active ? 'bg-zinc-600' : '',
                                'block px-4 py-2 text-sm',
                              )}
                            >
                              <FormattedMessage id="navbar.session.profile" />
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={clsx(
                                active ? 'bg-zinc-600' : '',
                                'block px-4 py-2 text-sm ',
                              )}
                            >
                              <FormattedMessage id="navbar.session.settings" />
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              className={clsx(
                                active ? 'bg-zinc-600' : '',
                                'block cursor-pointer px-4 py-2 text-sm ',
                              )}
                              onClick={() => signOut({ callbackUrl: '/' })}
                            >
                              <FormattedMessage id="navbar.session.signOut" />
                            </p>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
                <div className="ml-4 hidden sm:block">
                  <LocaleSwitcher />
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.key}
                  as="a"
                  href={item.href}
                  className={clsx(
                    router.pathname.includes(item.href)
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={
                    router.pathname.includes(item.href) ? 'page' : undefined
                  }
                >
                  <FormattedMessage id={'navbar.' + item.key} />
                </Disclosure.Button>
              ))}
              <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white">
                <LocaleSwitcher />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
