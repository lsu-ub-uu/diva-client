import { i18nContext } from 'server/i18n';
import type { Route } from '../article/+types/article';
import styles from '@/components/Article/Article.module.css';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const loader = async ({ params, context }: Route.LoaderArgs) => {
  const { language } = context.get(i18nContext);
  const { articleId } = params;

  console.log(`Loading article ${`./${articleId}.${language}.md`}`);

  const markdown = await import(`./${articleId}.${language}.md?raw`).catch(
    (e) => {
      console.error(
        `Failed to load article ${articleId} in language ${language}:`,
        e,
      );
      return null;
    },
  );

  if (!markdown) {
    throw new Response('Article not found', { status: 404 });
  }

  return { markdown: markdown.default, breadcrumb: articleId };
};

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    <main className='grid main-content'>
      <div className='grid-col-12'>
        <Breadcrumbs />
      </div>

      <article className={`grid-col-12 ${styles['article']}`}>
        <Markdown remarkPlugins={[remarkGfm]}>{loaderData.markdown}</Markdown>
      </article>
    </main>
  );
}
