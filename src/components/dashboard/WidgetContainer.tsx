import React from 'react';
import { X, MoreVertical, GripHorizontal } from 'lucide-react';
import classNames from 'classnames';
import styles from './WidgetContainer.module.css';

interface WidgetContainerProps {
    id: string;
    title?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onRemove?: () => void;
    // Passed by react-grid-layout
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
}

// Forward ref is required by react-grid-layout
export const WidgetContainer = React.forwardRef<HTMLDivElement, WidgetContainerProps>(
    ({ id, title, children, className, style, onRemove, onMouseDown, onMouseUp, onTouchEnd, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={classNames(styles.widget, className)}
                style={style}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchEnd={onTouchEnd}
                {...props}
            >
                <div className={classNames(styles.header, 'drag-handle')}>
                    <div className={styles.dragHandle}>
                        <GripHorizontal size={16} />
                        <span className={styles.title}>{title || 'Untitled Widget'}</span>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.actionButton}>
                            <MoreVertical size={16} />
                        </button>
                        <button className={styles.actionButton} onClick={onRemove}>
                            <X size={16} />
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        );
    }
);
