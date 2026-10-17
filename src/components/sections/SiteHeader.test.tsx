import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/components/ui'
import { SiteHeader } from './SiteHeader'
function setup(){ return render(<ThemeProvider><SiteHeader /></ThemeProvider>) }
describe('SiteHeader', () => {
  it('preserves official logo, real anchors and a language link', () => {
    setup()
    expect(screen.getByRole('img',{name:'ADEV'})).toHaveAttribute('src','/logo/logo.png')
    expect(screen.getByRole('navigation',{name:'Main navigation'}).querySelectorAll('a')).toHaveLength(4)
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
})
