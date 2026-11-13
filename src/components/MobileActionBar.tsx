import { Phone, MessageCircle } from 'lucide-react';
import {
  contact,
  externalLinkProps,
  registrationFormUrl,
} from '@/config/siteConfig';

/**
 * Phone-only bar pinned to the bottom of the screen with the three actions a
 * visitor is most likely to want: call, WhatsApp, join.
 */
export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur-xl sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="flex items-stretch gap-2 p-2">
        <li>
          <a
            href={contact.phoneHref}
            className="grid h-12 w-14 place-items-center rounded-full border border-line text-ink"
            aria-label={`Call ${contact.phoneDisplay}`}
          >
            <Phone className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            href={contact.whatsappHref}
            {...externalLinkProps}
            className="grid h-12 w-14 place-items-center rounded-full bg-[#25D366] text-white"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" fill="currentColor" />
          </a>
        </li>
        <li className="flex-1">
          <a
            href={registrationFormUrl}
            {...externalLinkProps}
            className="btn-primary h-12 w-full"
          >
            Join now
          </a>
        </li>
      </ul>
    </nav>
  );
}
