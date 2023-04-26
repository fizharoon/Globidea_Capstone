import React from 'react';

const AccordionContent = ({content, url}) => {
  return (
    <div className="accordion-content">
      <li>{content}</li>
      <p><a href={url} target="_blank">Learn More</a></p>
    </div>
  );
};

export default AccordionContent;