import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentPropsWithoutRef } from 'react';

type ImgProps = ComponentPropsWithoutRef<'img'>;

/**
 * Docs images get descriptive alt/title for SEO and accessibility.
 * Falls back to a Fusion Framework caption when authors omit alt text.
 */
function SeoImage(props: ImgProps) {
  const alt =
    typeof props.alt === 'string' && props.alt.trim().length > 0
      ? props.alt.trim()
      : 'Fusion Framework documentation image';

  return (
    // eslint-disable-next-line @next/next/no-img-element -- MDX content images
    <img
      {...props}
      alt={alt}
      title={props.title ?? alt}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: SeoImage,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
