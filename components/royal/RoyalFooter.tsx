import Link from "next/link";

/* Split out of RoyalHome so the home page can slot its SEO sections
   (BiharServicesSEO, RecentProjectsShowcase) between the closing CTA and the
   footer. Styles are the flat `.rh-foot*` rules in app/royal.css — they are
   not nested under `.rh-root`, so this renders correctly outside it. */
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

          {/* Real routes, not in-page anchors — this footer is the home
              page's only footer, so it carries the site's internal linking. */}
          <div className="rh-foot-col">
            <h3>Services</h3>
            <ul>
              <li><Link href="/expertise/web-development">Website Development</Link></li>
              <li><Link href="/expertise/mobile-app">Mobile Apps</Link></li>
              <li><Link href="/expertise/custom-software">Custom Software &amp; CRM</Link></li>
              <li><Link href="/services">All services</Link></li>
            </ul>
          </div>

          <div className="rh-foot-col">
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/expertise">Expertise</Link></li>
              <li><Link href="/industries">Industries</Link></li>
              <li><Link href="/blog">Blog</Link></li>
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
            <Link href="/trust">Trust</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
