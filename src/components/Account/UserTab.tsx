import React, { useState, ReactNode, ReactElement } from 'react';
import styles from '@/src/styles/scss/components/account/AccountTab.module.scss';

interface TabProps {
  index: number;
  label: string;
}

interface UserTabProps {
  children: ReactNode;
}

const UserTab: React.FC<UserTabProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const onClickTabItem = (index: number) => setActiveTab(index);

  return (
    <div style={{ margin: '0px 10px' }}>
      <div className={styles.userTab}>
        <div className={styles.userTabNav}>
          <ul className={styles.userTabMenu}>
            {React.Children.map(children, (child) => {
              const tabProps = (child as ReactElement<TabProps>).props;
              if (tabProps) {
                return (
                  <li
                    className={`${styles.userTabItem} ${
                      tabProps.index === activeTab ? styles.userTabActive : ''
                    }`}
                    key={tabProps.label}
                    role="presentation"
                    onClick={() => onClickTabItem(tabProps.index)}
                  >
                    {tabProps.label}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div className={styles.userTabContent}>
          {React.Children.map(children, (child) => {
            const tabProps = (child as ReactElement<TabProps>).props;
            if (tabProps && tabProps.index === activeTab) {
              return child;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserTab;
