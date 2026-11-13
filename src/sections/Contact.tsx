import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import {
  Phone,
  MessageCircle,
  Instagram,
  Navigation,
  ArrowUpRight,
} from 'lucide-react';
import { contact, address, externalLinkProps } from '@/config/siteConfig';

const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  'Workout World Gym, GNR Complex, Mathikere, Bengaluru 560054',
)}&output=embed`;

export default function Contact() {
  const items = [
    {
      icon: Phone,
      label: 'Call us',
      value: contact.phoneDisplay,
      href: contact.phoneHref,
      external: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Send us a message',
      href: contact.whatsappHref,
      external: true,
    },
    {
      icon: Navigation,
      label: 'Directions',
      value: 'Open in Google Maps',
      href: contact.mapsHref,
      external: true,
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: 'Follow Deepak Kaverappa',
      href: contact.instagramHref,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px">
        <SectionHeading
          title="Come train with us"
          description="Find us in Mathikere, right by the M.S. Ramaiah Bus Stop. Call, message or drop by — we’re happy to show you around."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <address className="display-title text-4xl not-italic leading-[1.02] text-ink sm:text-5xl">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city} – {address.pincode}
              </address>
            </Reveal>

            <ul className="mt-9 border-t border-line">
              {items.map((item, i) => (
                <Reveal as="li" key={item.label} delay={i * 0.04}>
                  <a
                    href={item.href}
                    {...(item.external ? externalLinkProps : {})}
                    className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:text-accent"
                  >
                    <item.icon
                      className="h-5 w-5 shrink-0 text-accent"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <span className="flex-1">
                      <span className="block text-sm text-ink-muted">
                        {item.label}
                      </span>
                      <span className="block text-lg font-medium text-ink transition-colors group-hover:text-accent">
                        {item.value}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Map */}
          <Reveal delay={0.05} className="lg:col-span-7">
            <div className="h-full min-h-[380px] overflow-hidden rounded-[2rem] border border-line">
              <iframe
                title="Workout World Gym location on Google Maps"
                src={mapEmbed}
                className="h-full min-h-[380px] w-full rounded-[2rem] [filter:grayscale(1)_invert(0.92)_contrast(0.9)]"
                style={{ border: 0 }}
                loading="lazy"
                // The map runs in a sandbox: it can run its own scripts and open
                // links in a new tab, but it cannot navigate or script this page.
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
