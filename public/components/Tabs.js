import React, { useState } from 'react';
import TabPanel from '../components/TabPanel.js';
import TabList from '../components/TabList.js';
import TabButton from '../components/TabButton.js';

const Tabs = ({ id, tabs, children, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id={id} className="tabs tabs--me" {...props}>
      <TabList aria-orientation="vertical" role="tablist" labelledBy={id}>
        {tabs.map((t, i) => {
          const { id, label } = t;
          return (
            <TabButton
              id={`tab_${i}`}
              role="tab"
              aria-controls={`panel_${i}`}
              key={id}
              label={label}
              onClick={() => setActiveIndex(i)}
              active={i === activeIndex}
            />
          );
        })}
      </TabList>
      {tabs.map((t, i) => {
        if (i !== activeIndex) return undefined;
        const { id, component } = t;
        return (
          <TabPanel
            role="tabpanel"
            id={`panel_${i}`}
            aria-labelledby={`tab_${i}`}
            key={id}
            active={i === activeIndex}
            aria-selected={i === activeIndex}
          >
            {component}
          </TabPanel>
        );
      })}
    </div>
  );
};

export default Tabs;
