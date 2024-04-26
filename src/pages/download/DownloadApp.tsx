import Head from 'next/head';
import DownloadButton from '../../components/Buttons/DownloadButton/DownloadButton';
import styles from '../../styles/scss/pages/download/DownloadPage.module.scss';
import IsAuthPublic from '@/src/utils/authHocs/isAuthPublic';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.downloadContainer}>
      <div className={styles.downloadContainerAlign}>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <title>Your PWA Download</title>
        </Head>

        <header className={styles.header}>
          <h1>Welcome to Your PWA Download</h1>
          <p>Enjoy a seamless experience with our progressive web app.</p>
        </header>

        <main className={styles.main}>
          <DownloadButton />
        </main>
      </div>
    </div>
  );
};

export default IsAuthPublic(DownloadPage);
