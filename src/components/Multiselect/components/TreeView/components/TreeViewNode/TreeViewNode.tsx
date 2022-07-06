import { ReactNode } from 'react';
import cn from 'classnames';
import styles from './TreeViewNode.module.scss';
import { Collapse } from '../../../../../Collapse';

interface Props<T extends string | number> {
  className?: string;
  id: T;
  title: string;
  expanded: boolean;
  children: ReactNode;
  onToggle(id: T, value: boolean): void;
}

export const TreeViewNode = <T extends string | number>({
  className,
  children,
  title,
  expanded,
  id,
  onToggle,
}: Props<T>) => {
  const handleToggle = () => {
    onToggle(id, !expanded);
  };

  return (
    <li className={className}>
      <button
        type="button"
        className={cn(styles.control, expanded && styles.controlExpanded)}
        onClick={handleToggle}
      >
        {title}
      </button>

      <Collapse expanded={expanded}>
        <ul className={styles.list}>{children}</ul>
      </Collapse>
    </li>
  );
};
