import { Helmet } from 'react-helmet-async';
import { site } from '@/config/siteConfig';
import { faqs } from '@/data/faq';
import { jsonForScript } from '@/lib/safeUrl';

/**
 * Runtime SEO. The business (LocalBusiness) structured data is static in
 * index.html so it is readable without JavaScript; this adds the FAQ data,
 * which is generated from the same config as the on-page answers.
 */
export default function SEO() {
  const title = `${site.name} | Best Gym in ${site.locationLabel}`;
  const description = `${site.name} in ${site.locationLabel} near M.S. Ramaiah Bus Stop. Strength & weight training, personal training, diet plans and fitness consultations. Open Mon–Sat, 5 AM–11 PM.`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${site.url}/`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${site.url}/`} />
      <script type="application/ld+json">{jsonForScript(faqLd)}</script>
    </Helmet>
  );
}
