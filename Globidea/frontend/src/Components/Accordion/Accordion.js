import React, {useState} from 'react';
import AccordionContent from './AccordionContent';

const Accordion = ({title, content, url}) => {
    const [isActive, setIsActive] = useState(false);
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
        display: isActive ? 'block' : 'none',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out, display 0.5s ease-in-out',
    }

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={toggleAccordion}>
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {/* <AccordionContent content={content} url={url} style={contentStyle} ref={handleContent} /> */}
            <div className="accordion-content" style={contentStyle} ref={handleContent}>
                <li>{content}</li>
                <p><a href={url} target="_blank">Learn More</a></p>
            </div>
        </div>
    );
};

export default Accordion;