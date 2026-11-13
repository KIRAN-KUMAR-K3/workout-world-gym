import { contact, externalLinkProps } from '@/config/siteConfig';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href={contact.whatsappHref}
      {...externalLinkProps}
      aria-label="Chat with Workout World Gym on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:gap-2 sm:flex"
    >
      <span className="relative grid h-14 w-14 shrink-0 place-items-center">
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/60"
          aria-hidden
        />
        <MessageCircle className="h-7 w-7" fill="currentColor" aria-hidden />
      </span>
      <span className="max-w-0 whitespace-nowrap pr-0 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-5 group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
