
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FaProductHunt } from 'react-icons/fa';

import { SubscribButton } from '../components/SubscribeButton/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface homeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({ product }:homeProps) {
  return (
    <>
      <Head>
          <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            👏 Hey, Welcome
            <h1>News about the <span> React </span> world.</h1>
            <p>
              Get access to all the publications
              <span> for {product.amount} month</span>
            </p>
            <SubscribButton priceId={product.priceId}/>
          </span>
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JX9m3JCRJXde43Bqhzjpnaf');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  };
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 // = 24 hours
  }
}