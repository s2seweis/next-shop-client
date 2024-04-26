import { useEffect, useState } from 'react';
import styles from '../../../styles/scss/components/buttons/DownloadButton.module.scss';

const DownloadButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  const [isAppInstalled, setIsAppInstalled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone // Type assertion added here
    ) {
      setIsAppInstalled(true);
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showInstallButton) {
      timeout = setTimeout(() => {
        window.location.reload();
      }, 3000); // 3 seconds
    }

    return () => clearTimeout(timeout);
  });

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button
      className={styles.installButton}
      onClick={handleInstallClick}
      disabled={isAppInstalled}
    >
      {showInstallButton ? 'Install Now' : 'Already Installed'}
    </button>
  );
};

export default DownloadButton;
