import React, {useState} from 'react';

const AccordionContent = ({content, url}) => {
  const [isActive, setIsActive] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const handleContent = (contentRef) => {
    if(contentRef){
        setContentHeight(contentRef.scrollHeight);
    }
  };

  const contentStyle = {
    maxHeight: isActive ? contentHeight + 'px' : 0,
    opacity: isActive ? 1 : 0,
    overflow: "hidden", 
    transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out", 
  };

  return (
    <div className="accordion-content" style={contentStyle} ref={handleContent}>
      <li>{content}</li>
      <p><a href={url} target="_blank">Learn More</a></p>
    </div>
  );
};

export default AccordionContent;