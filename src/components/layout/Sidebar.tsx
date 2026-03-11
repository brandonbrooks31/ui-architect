import React from 'react';
import { Type, Image, BarChart, StickyNote } from 'lucide-react';
import styles from './Sidebar.module.css';

interface DraggableItemProps {
    type: string;
    icon: React.ReactNode;
    label: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, icon, label }) => {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('application/reactflow/type', type);
        e.dataTransfer.effectAllowed = 'copy';
    };

    return (
        <div
            className={styles.draggableItem}
            draggable
            onDragStart={handleDragStart}
        >
            <div className={styles.iconWrapper}>{icon}</div>
            <span className={styles.label}>{label}</span>
        </div>
    );
};

export const Sidebar: React.FC = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Insert</h3>
                <div className={styles.grid}>
                    <DraggableItem type="text" label="Text" icon={<Type size={20} />} />
                    <DraggableItem type="image" label="Image" icon={<Image size={20} />} />
                    <DraggableItem type="chart" label="Chart" icon={<BarChart size={20} />} />
                    <DraggableItem type="note" label="Note" icon={<StickyNote size={20} />} />
                </div>
            </div>
        </aside>
    );
};
