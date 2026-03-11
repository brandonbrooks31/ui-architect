import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <Sidebar />
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};
