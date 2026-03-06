import {
  SiteHeader,
  HeroSection,
  ServicesSection,
  FeaturedProjectsSection,
  MedicaHighlightSection,
  ProcessSection,
  FinalCTASection,
  SiteFooter,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedProjectsSection />
        <MedicaHighlightSection />
        <ProcessSection />
        <FinalCTASection />
      </main>
      <SiteFooter />
    </>
  )
}
