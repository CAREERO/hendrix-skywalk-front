// src/components/common/Tooltip/Tooltip.tsx
import React from 'react';

import classes from './Tooltip.module.scss';

interface TooltipProps {
  text: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className={classes.tooltip}>
      {children}
      <span className={classes.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
