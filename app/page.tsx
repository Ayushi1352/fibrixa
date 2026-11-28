import rawData from "@/data/templates.json";
import type { FibrixaTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const templateData: FibrixaTemplateData = rawData;
const sectionData = templateData.categories.Packaging.sections;
const commonData = templateData.common;

/*
  One landing page, sections in the order of the design. Each section's id (templates.json) matches the
  menu and footer links ("#about" → id="about"); the "Contact Us" button leads to the contact form (#contact).
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.PackagingHero1} />
      <AboutSection data={sectionData.About?.variants?.PackagingAbout1} />
      <ServicesSection data={sectionData.Services?.variants?.PackagingServices1} />
      <ProductsSection data={sectionData.Products?.variants?.PackagingProducts1} />
      <IndustriesSection data={sectionData.Industries?.variants?.PackagingIndustries1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.PackagingTestimonials1} />
      <ContactSection
        data={sectionData.Contact?.variants?.PackagingContact1}
        form={sectionData.EnquiryForm?.variants?.PackagingEnquiryForm1}
        company={commonData.company}
      />
    </main>
  );
}
