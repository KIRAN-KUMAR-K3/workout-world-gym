import { Phone, MessageCircle, Instagram, MapPin } from 'lucide-react';
import {
  site,
  address,
  contact,
  navLinks,
  hoursSummary,
  externalLinkProps,
  registrationFormUrl,
} from '@/config/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: Phone, label: 'Call us', href: contact.phoneHref, external: false },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: contact.whatsappHref,
      external: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: contact.instagramHref,
      external: true,
    },
    { icon: MapPin, label: 'Directions', href: contact.mapsHref, external: true },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pb-20 sm:pb-0">
      <div className="container-px pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="display-title text-4xl text-ink">
              Built different. Train different.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              A strength and fitness gym in {site.locationLabel}, founded by
              international bodybuilder Deepak Kaverappa.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.external ? externalLinkProps : {})}
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm text-ink-muted">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div className="lg:col-span-3">
            <h3 className="text-sm text-ink-muted">Visit</h3>
            <address className="mt-4 not-italic leading-relaxed text-ink">
              {address.line1}
              <br />
              {address.line2}
              <br />
              {address.city} – {address.pincode}
              <br />
              {address.state}, {address.country}
            </address>
            <a
              href={contact.phoneHref}
              className="mt-3 inline-block font-semibold text-accent"
            >
              {contact.phoneDisplay}
            </a>
          </div>

          {/* Hours + CTA */}
          <div className="lg:col-span-2">
            <h3 className="text-sm text-ink-muted">Hours</h3>
            <p className="mt-4 leading-relaxed text-ink">
              {hoursSummary.weekdays}
              <br />
              {hoursSummary.weekdayHours}
              <br />
              <span className="text-accent">{hoursSummary.sunday}</span>
            </p>
            <a
              href={registrationFormUrl}
              {...externalLinkProps}
              className="btn-primary mt-6"
            >
              Join now
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-line py-6 text-sm text-ink-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Mathikere, Bengaluru, Karnataka, India</p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p
        className="text-stroke-accent pointer-events-none -mb-[0.16em] select-none whitespace-nowrap text-center font-display text-[17.4vw] leading-none opacity-30"
        aria-hidden
      >
        Workout World
      </p>
    </footer>
  );
}
