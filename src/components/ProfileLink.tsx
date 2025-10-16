import type { ComponentPropsWithoutRef, ComponentType, ReactNode, SVGProps } from 'react';

type ProfileLinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

type ProfileLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'href'> & {
  href: string;
  icon: ProfileLinkIcon;
  label: string;
  children?: ReactNode;
  iconWrapperClassName?: string;
  iconClassName?: string;
};

export const ProfileLink = ({
  href,
  icon: Icon,
  label,
  children,
  className,
  iconWrapperClassName,
  iconClassName,
  target = '_blank',
  rel,
  ...anchorProps
}: ProfileLinkProps) => {
  const combinedClassName = className
    ? `inline-flex items-center gap-2 ${className}`
    : 'inline-flex items-center gap-2';
  const wrapperClasses = iconWrapperClassName
    ? `flex size-6 items-center justify-center ${iconWrapperClassName}`
    : 'flex size-6 items-center justify-center';
  const iconClasses = iconClassName ? `max-h-full max-w-full fill-current ${iconClassName}` : 'h-full w-full fill-current';
  const computedRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;

  return (
    <a
      href={href}
      className={combinedClassName}
      target={target}
      rel={computedRel}
      aria-label={children ? undefined : label}
      {...anchorProps}
    >
      <span className={wrapperClasses}>
        <Icon className={iconClasses} aria-hidden="true" focusable="false" />
      </span>
      {children}
      {!children && <span className="sr-only">{label}</span>}
    </a>
  );
};

export type { ProfileLinkProps };
