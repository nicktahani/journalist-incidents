import React, { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import Tooltip from '../components/presentation/Tooltip';

const TooltipContext = createContext()

export const useTooltipContext = () => useContext(TooltipContext)

export const TooltipProvider = ({ children }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [tooltipContent, setTooltipContent] = useState(null)

  const handlePointerEnter = (e, content) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY })
    setTooltipContent(content)
  };

  const handlePointerLeave = () => {
    setTooltipContent(null)
  };

  return (
    <TooltipContext.Provider
      value={{ tooltipContent, handlePointerEnter, handlePointerLeave }}
    >
      {children}
      {tooltipContent && createPortal(
        <Tooltip content={tooltipContent} position={tooltipPosition} />,
        document.body
      )}
    </TooltipContext.Provider>
  );
};
