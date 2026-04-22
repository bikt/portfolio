// lib/cases.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface CaseMeta {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  tags: string[];
  type: string;
  cover?: string;
  draft?: boolean;
}

export interface Case extends CaseMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content/work');

export function getAllCases(locale: string): CaseMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const slugs = fs.readdirSync(CONTENT_DIR).filter(f =>
    fs.statSync(path.join(CONTENT_DIR, f)).isDirectory()
  );

  const cases = slugs
    .map(slug => {
      const filePath = path.join(CONTENT_DIR, slug, `index.${locale}.mdx`);
      if (!fs.existsSync(filePath)) return null;

      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? slug,
        subtitle: data.subtitle ?? '',
        year: data.year ?? new Date().getFullYear(),
        tags: data.tags ?? [],
        type: data.type ?? '',
        cover: data.cover,
        draft: data.draft ?? false,
      } as CaseMeta;
    })
    .filter((c): c is CaseMeta => c !== null && !c.draft);

  return cases.sort((a, b) => b.year - a.year);
}

export function getCase(slug: string, locale: string): Case | null {
  const filePath = path.join(CONTENT_DIR, slug, `index.${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    subtitle: data.subtitle ?? '',
    year: data.year ?? new Date().getFullYear(),
    tags: data.tags ?? [],
    type: data.type ?? '',
    cover: data.cover,
    draft: data.draft ?? false,
    content,
  };
}
