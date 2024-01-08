import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Layout, { siteTitle } from '@/components/Layout';
import Link from 'next/link';
import utilstyles from "@/styles/utils.module.css"
import { getPostsData } from '../lib/post'; // getPostsDataのみimport

export async function getStaticProps() {
  const allPostsData = await getPostsData(); // 全ての投稿のデータを取得する

  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section className={styles.headingMd}>
        <p>立花和雅です</p>
      </section>
      <section className={`${styles.headingMd} ${styles.padding1px}`}>
        <h2>エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={thumbnail}
                  className={styles.thumbnailImage}
                  alt={title}
                />
                <div className={styles.boldText}>
                  {title}
                  <br />
                  <small className={styles.lightText}>{date}</small>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
