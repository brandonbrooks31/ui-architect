import React from 'react';
import { Menu, BarChart2 } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles.iconButton}>
                    <Menu size={20} />
                </button>
                <div className={styles.logo}>
                    <BarChart2 size={24} className={styles.logoIcon} />
                    <span>Studio Dashboard</span>
                </div>
            </div>
            <div className={styles.right}>
                {/* Actions placeholder */}
                <button className={styles.actionButton}>Share</button>
                <div className={styles.avatar}>U</div>
            </div>
        </header>
    );
};
