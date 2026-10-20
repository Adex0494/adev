import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/components/ui'
import { SiteHeader } from './SiteHeader'
function setup(){ return render(<ThemeProvider><SiteHeader /></ThemeProvider>) }
afterEach(() => { window.history.replaceState(null, '', '/') })
describe('SiteHeader', () => {
  it('preserves official logo, real anchors and a language link', () => {
    setup()
    expect(screen.getByRole('img',{name:'ADEV'})).toHaveAttribute('src','/logo/logo.png')
    expect(screen.getByRole('navigation',{name:'Main navigation'}).querySelectorAll('a')).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link',{name:'Cambiar a español'})).toHaveAttribute('href','/?lang=es')
    expect(screen.getByRole('link',{name:'Skip to content'})).toHaveAttribute('href','#main-content')
  })
  it('opens the project dialog', async () => {
    setup()
    await userEvent.click(screen.getByRole('button',{name:/start a project/i}))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
  it('opens the mobile menu and closes it on navigation', async () => {
    setup()
    const toggle=screen.getByRole('button',{name:'Menu'})
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded','true')
    const menu=screen.getByRole('navigation',{name:'Menu'})
    await userEvent.click(menu.querySelector('a')!)
    expect(toggle).toHaveAttribute('aria-expanded','false')
  })
  it('makes Work current on a product route and returns to localized home sections', async () => {
    window.history.replaceState(null, '', '/products/medika?lang=es')
    render(<ThemeProvider><SiteHeader locale="es" /></ThemeProvider>)
    const nav = screen.getByRole('navigation', { name: 'Navegación principal' })
    const links = within(nav).getAllByRole('link')
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/?lang=es#services', '/?lang=es#work', '/?lang=es#about', '/?lang=es#contact'])
    expect(links[1]).toHaveAttribute('aria-current', 'page')
    expect(links[1]).toHaveAttribute('data-active', 'true')
    expect(links[1]).not.toHaveAttribute('aria-describedby')
    expect(screen.getByRole('link', { name: /inicio.*akdevia/i })).toHaveAttribute('href', '/?lang=es')
    expect(screen.getByRole('link', { name: /switch to english/i })).toHaveAttribute('href', '/products/medika?lang=en')
    await userEvent.click(screen.getByRole('button', { name: 'Menú' }))
    const menu = screen.getByRole('navigation', { name: 'Menú' })
    expect(menu.querySelector('[aria-current="page"]')).toHaveAttribute('href', '/?lang=es#work')
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Menú' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Menú' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Menú' })).toHaveFocus()
    await userEvent.click(screen.getByRole('button', { name: 'Menú' }))
    await userEvent.tab()
    expect(within(screen.getByRole('navigation', { name: 'Menú' })).getAllByRole('link')[0]).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Menú' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Menú' })).toHaveFocus()
  })

  it('tracks each reading section without claiming a current page or highlighting the hero', () => {
    let notify: IntersectionObserverCallback = () => {}
    const disconnect = vi.fn()
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) { if (options?.rootMargin?.includes(' 0px ')) notify = callback }
      observe() {}
      unobserve() {}
      disconnect = disconnect
    })
    let current = 'hero'
    const ids = ['hero', 'services', 'work', 'about', 'process', 'contact']
    const { unmount } = render(<ThemeProvider><SiteHeader /><main>{ids.map(id => <section key={id} id={id} ref={node => {
      if (node) node.getBoundingClientRect = () => ({ top: (ids.indexOf(id) - ids.indexOf(current)) * 1000 + 72 }) as DOMRect
    }} />)}</main></ThemeProvider>)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav.querySelector('[data-active]')).toBeNull()
    for (const id of ids.slice(1)) {
      current = id
      act(() => { notify([], {} as IntersectionObserver) })
      const link = nav.querySelector('[data-active="true"]')!
      expect(link).toHaveAttribute('href', `#${id === 'process' ? 'about' : id}`)
      expect(link).toHaveAttribute('aria-describedby', 'nav-current-section')
      expect(link).not.toHaveAttribute('aria-current')
      expect(document.getElementById('nav-current-section')).toHaveTextContent('Current section')
    }
    current = 'hero'
    act(() => { notify([], {} as IntersectionObserver); window.dispatchEvent(new Event('resize')) })
    expect(nav.querySelector('[data-active]')).toBeNull()
    unmount()
    expect(disconnect).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
