import { Link, createFileRoute } from '@tanstack/react-router';
import { ProfileLink } from '@/components/ProfileLink';
import BlueskyIcon from '@/assets/bluesky.svg?react';
import GithubIcon from '@/assets/github.svg?react';
import InstagramIcon from '@/assets/instagram.svg?react';
import LinkedinIcon from '@/assets/linkedin.svg?react';
import XIcon from '@/assets/x.svg?react';
import { Heading } from '@/components/Heading';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/site';

const ABOUT_TITLE = 'About — Kevin Hosford';
const ABOUT_DESCRIPTION =
  'Kevin Hosford — front-end team lead at Axiom. Links to GitHub, LinkedIn, Bluesky, X, Instagram.';
const ABOUT_URL = `${SITE_URL}/about`;

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: ABOUT_TITLE },
      { name: 'description', content: ABOUT_DESCRIPTION },
      { property: 'og:title', content: ABOUT_TITLE },
      { property: 'og:description', content: ABOUT_DESCRIPTION },
      { property: 'og:url', content: ABOUT_URL },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: ABOUT_TITLE },
      { name: 'twitter:description', content: ABOUT_DESCRIPTION },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      { name: 'twitter:creator', content: TWITTER_HANDLE },
    ],
    links: [{ rel: 'canonical', href: ABOUT_URL }],
  }),
  component: RouteComponent,
});

const profileLinks = [
  {
    href: 'https://github.com/kevinehosford',
    icon: GithubIcon,
    label: 'GitHub',
  },
  {
    href: 'https://bsky.app/profile/khos.bsky.social',
    icon: BlueskyIcon,
    label: 'Bluesky',
  },
  {
    href: 'https://www.instagram.com/k3vn.h64/',
    icon: InstagramIcon,
    label: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com/in/kevinehosford/',
    icon: LinkedinIcon,
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/kevinehosford',
    icon: XIcon,
    label: 'X',
  },
] as const;

function RouteComponent() {
  return (
    <main className="mx-auto flex w-full max-w-centered flex-col gap-12 px-2 py-12 sm:px-6 sm:py-16 lg:min-h-[70vh] lg:flex-row lg:items-center lg:justify-between lg:gap-20">
      <section className="max-w-prose space-y-6 sm:space-y-8">
        <Heading.h1 className="text-3xl sm:text-4xl">about</Heading.h1>
        <div className="space-y-4 text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
          <p>
            i&rsquo;m kevin - front-end team lead at{' '}
            <a href="https://axiom.co" target="_blank" rel="noopener noreferrer">
              axiom
            </a>
            . we&rsquo;re working on exciting things.
          </p>
          <p>
            read more about what i&rsquo;ve been up to on my <Link to="/log">development log</Link>.
          </p>
        </div>
      </section>
      <aside className="flex w-full flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:max-w-xs lg:min-w-[260px] lg:p-0">
        <span className="type-body/semibold text-sm tracking-[0.2em] text-muted uppercase sm:text-base">
          find me online
        </span>
        <ul className="grid w-full [grid-auto-rows:auto] grid-cols-1 gap-3 px-0 sm:[grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] sm:gap-4 sm:!pl-0">
          {profileLinks.map((profile) => (
            <li key={profile.href}>
              <ProfileLink
                href={profile.href}
                icon={profile.icon}
                label={profile.label}
                className="type-body/medium text-base sm:text-lg"
              >
                {profile.label.toLowerCase()}
              </ProfileLink>
            </li>
          ))}
        </ul>
      </aside>
    </main>
  );
}
