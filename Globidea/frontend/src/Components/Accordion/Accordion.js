import React, {useState} from 'react';
import AccordionContent from '../../Components/Accordion/AccordionContent';
 
const Accordion = ({title, content}) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    const contentStyle = {
        maxHeight: isActive ?  '0px' : 0,
        display: isActive ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out, display 0.5s ease-in-out',
    }

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={toggleAccordion}>
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive ? (
                content.map(([content, url], index) => {
                    return(
                        <AccordionContent key={index} content={content} url={url}/>
                    )
                })
            ) : <></>}
        </div>
    );
};

export default Accordion;