import { render, screen } from '@testing-library/react'
import { SiteFooter } from './SiteFooter'
import { site } from '@/lib/site'
describe('SiteFooter', () => {
  it('contains only real professional profiles and email', () => {
    render(<SiteFooter />)
    for(const [label,url] of [['GitHub',site.github],['LinkedIn',site.linkedin]]) {
      const link=screen.getByRole('link',{name:new RegExp(label)})
      expect(link).toHaveAttribute('href',url)
      expect(link).toHaveAttribute('target','_blank')
      expect(link).toHaveAttribute('rel','noopener noreferrer')
    }
    expect(screen.getByRole('link',{name:site.email})).toHaveAttribute('href',`mailto:${site.email}`)
    expect(document.querySelector('a[href="#"]')).toBeNull()
    expect(screen.queryByText(/twitter|careers|blog/i)).not.toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${new Date().getFullYear()} AKDEVIA`))).toBeInTheDocument()
  })
})
