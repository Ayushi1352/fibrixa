export interface ThemeFonts {
  primary: string;
  display: string;
  about: string;
  services: string;
  card: string;
  title: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

/** A phone number, e-mail or address with its icon (shared by the contact section and the footer) */
export interface ContactItem {
  id: string;
  /** icon in the maroon square of the contact section */
  icon: string;
  /** icon in the footer's "Get In Touch" list */
  footerIcon: string;
  title: string;
  value: string;
  url: string;
}

export interface CompanyData {
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  /** the business's phone, e-mail and address, written once for the whole site */
  contactItems: ContactItem[];
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: LinkItem[];
}

export interface FooterData {
  /** the footer's own white logo, as in the design */
  logo: string;
  logoWidth: number;
  logoHeight: number;
  logoUrl: string;
  homeLabel: string;
  linkGroups: FooterLinkGroup[];
  contactTitle: string;
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A section title: the words before the highlighted (maroon) words, the highlighted words, and any words after them */
export interface SplitTitle {
  titleTop: string;
  titleAccent: string;
  titleEnd?: string;
}

export interface HeroData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line */
  description: string;
  /** the hero picture: the packaging photo on the right, its wall and table continued to the left behind the text */
  image: string;
  imageAlt: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  text: string;
}

export interface AboutData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  featuresLabel: string;
  /** the first half is shown in the left column, the rest in the right one */
  features: FeatureItem[];
  image: string;
  imageAlt: string;
}

/** A card with a product photo and a title (products and industries) */
export interface ImageItem {
  id: string;
  /** "\n" starts a new line */
  title: string;
  image: string;
  imageAlt: string;
}

export interface ServiceItem extends ImageItem {
  icon: string;
}

export interface ServicesData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  items: ServiceItem[];
}

export interface ProductsData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  items: ImageItem[];
}

export interface IndustriesData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  items: ImageItem[];
}

export interface TestimonialItem {
  id: string;
  /** "\n" starts a new line (kept from 1024px up) */
  quote: string;
  name: string;
  role: string;
  image: string;
  stars: number;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  /** "{stars} out of 5 stars" */
  ratingLabel: string;
  /** screen-reader name of the sliding cards */
  carouselLabel: string;
  /** arrow buttons */
  previousLabel: string;
  nextLabel: string;
  /** read out after an arrow press: "Testimonial {current} of {total}" */
  slideStatus: string;
  items: TestimonialItem[];
}

export interface FormField {
  placeholder: string;
}

export interface EnquiryFormData {
  fields: {
    name: FormField;
    email: FormField;
    phone: FormField;
    company: FormField;
    message: FormField;
  };
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

export interface ContactData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 640px up) */
  description: string;
  image: string;
  imageAlt: string;
  /** the form card's title: "Send Us a" and the highlighted (tan) "Message" */
  formTitleTop: string;
  formTitleAccent: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface FibrixaTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    Packaging: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Products?: Variants<ProductsData>;
        Industries?: Variants<IndustriesData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        EnquiryForm?: Variants<EnquiryFormData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
