import React, { useState, useEffect } from 'react';
import RGL from 'react-grid-layout';
const { Responsive, WidthProvider } = RGL as any;
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { WidgetContainer } from './WidgetContainer';
import styles from './DashboardGrid.module.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Widget {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    type: string;
}

// Initial Sample Data
const initialWidgets: Widget[] = [
    { i: '1', x: 0, y: 0, w: 4, h: 4, type: 'chart' },
    { i: '2', x: 4, y: 0, w: 4, h: 4, type: 'text' },
    { i: '3', x: 8, y: 0, w: 4, h: 4, type: 'image' }
];

export const DashboardGrid: React.FC = () => {
    const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
    const [mounted, setMounted] = useState(false);

    // Wait for matching client/server mount to avoid layout thrashing
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLayoutChange = (layout: any) => {
        // Sync internal state if needed, or save to backend
        console.log('Layout Update:', layout);
        // Be careful not to create infinite loops by blindly setting state here
        // layout only contains positional data, we need to merge with our type data if we update
    };

    const onRemoveItem = (i: string) => {
        setWidgets(widgets.filter((w) => w.i !== i));
    }

    const onDrop = (_layout: any, layoutItem: any, event: any) => {
        const type = event.dataTransfer.getData('application/reactflow/type');
        if (!type) return;

        const newWidget: Widget = {
            i: `n${widgets.length + 1}`,
            x: layoutItem.x,
            y: layoutItem.y,
            w: 4, // default width
            h: 4, // default height
            type
        };
        setWidgets([...widgets, newWidget]);
    }

    return (
        <div className={styles.gridContainer}>
            <ResponsiveGridLayout
                className="layout"
                layouts={{ lg: widgets }}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={60}
                draggableHandle=".drag-handle"
                isDroppable={true}
                onDrop={onDrop}
                measureBeforeMount={false}
                useCSSTransforms={mounted}
                compactType={null} // "vertical" for auto-compact, null for free draggable
                preventCollision={false}
                onLayoutChange={handleLayoutChange}
            >
                {widgets.map((widget) => (
                    <WidgetContainer
                        key={widget.i}
                        id={widget.i}
                        title={`${widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Widget`}
                        onRemove={() => onRemoveItem(widget.i)}
                        data-grid={{
                            x: widget.x,
                            y: widget.y,
                            w: widget.w,
                            h: widget.h,
                        }}
                    >
                        {widget.type === 'chart' && <div className={styles.placeholder}>Chart Widget Content</div>}
                        {widget.type === 'text' && <div className={styles.placeholder}>Text Widget Content</div>}
                        {widget.type === 'image' && <div className={styles.placeholder}>Image Widget Content</div>}
                        {widget.type === 'note' && <div className={styles.placeholder}>Sticky Note Content</div>}
                    </WidgetContainer>
                ))}
            </ResponsiveGridLayout>
        </div>
    );
};
