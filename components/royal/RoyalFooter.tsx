import Link from "next/link";

/* The site's single footer. It started as the home page's, split out of
   RoyalHome so the home page could slot its SEO sections between the closing
   CTA and the footer — then replaced the separate dark `components/Footer`
   that the inner pages used, so every route now ends the same way.

   Styles are the flat `.rh-foot*` rules in app/royal.css — they are not
   nested under `.rh-root`, so this renders correctly on the inner pages too. */

const SERVICE_LINKS = [
  { href: "/expertise/web-development", label: "Website Development" },
  { href: "/expertise/mobile-app", label: "Mobile Apps" },
  { href: "/expertise/custom-software", label: "Custom Software & CRM" },
  { href: "/expertise/billing-system", label: "Billing & Management" },
  { href: "/expertise/seo-services", label: "SEO Services" },
  { href: "/services", label: "All 25 services" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/expertise", label: "Expertise" },
  { href: "/industries", label: "Industries" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

/* Regional hubs carried over from the old footer. These are real state hub
   pages sitting above the city pages, so the links are load-bearing for
   internal linking, not decoration. */
const HUB_LINKS = [
  { href: "/location/bihar", label: "Bihar", cities: "Patna, Muzaffarpur, Gaya" },
  { href: "/location/maharashtra", label: "Maharashtra", cities: "Pune, Mumbai, Nagpur" },
  { href: "/location/gujarat", label: "Gujarat", cities: "Ahmedabad, Surat, Vadodara" },
];

export function RoyalFooter() {
  return (
    <footer className="rh-foot">
      <div className="rh-shell">
        <div className="rh-foot-top">
          <div>
            <div className="rh-foot-brand">
              <Link href="/">Sabka Saathi</Link>
            </div>
            <p className="rh-foot-blurb">
              A software studio in Patna building web platforms, mobile apps and
              automation for businesses across India. GST registered, remote-first.
            </p>
          </div>

          <div className="rh-foot-col">
            <h3>Services</h3>
            <ul>
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rh-foot-col">
            <h3>Company</h3>
            <ul>
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rh-foot-col">
            <h3>Locations</h3>
            <ul>
              {HUB_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                  <span className="rh-foot-sub">{l.cities}</span>
                </li>
              ))}
              <li>
                <Link href="/locations" className="rh-foot-more">
                  Browse all cities →
                </Link>
              </li>
            </ul>
          </div>

          <div className="rh-foot-col">
            <h3>Contact</h3>
            <ul>
              <li><a href="mailto:helpsabkasaathi@gmail.com">helpsabkasaathi@gmail.com</a></li>
              <li><a href="tel:+919431673018">+91 94316 73018</a></li>
              <li><a href="https://wa.me/919431673018" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><Link href="/contact">Send a brief</Link></li>
            </ul>
          </div>
        </div>

        <div className="rh-foot-row">
          <span>© {new Date().getFullYear()} Sabka Saathi Digital Services</span>
          <nav className="rh-foot-links">
            <Link href="/services">Services</Link>
            <Link href="/locations">Locations</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/trust">Legal &amp; Trust</Link>
            <Link href="/seo">SEO</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <span className="rh-foot-gstin">GSTIN: 10LAHPK8872L1Z3</span>
        </div>
      </div>
    </footer>
  );
}
