import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { faqs } from '@/data/faq';
import { contact, externalLinkProps } from '@/config/siteConfig';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad relative bg-bg-soft" aria-label="Frequently asked questions">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            layout="stack"
            title="Questions, answered"
            description="The things people ask us most before they join. Something else on your mind? Message us."
          />
          <a
            href={contact.whatsappHref}
            {...externalLinkProps}
            className="btn-outline mt-8"
          >
            Ask on WhatsApp
          </a>
        </div>

        <ul className="border-t border-line lg:col-span-7">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium text-ink transition-colors hover:text-accent sm:text-xl"
                  >
                    {item.question}
                    <Plus
                      className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-button-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
