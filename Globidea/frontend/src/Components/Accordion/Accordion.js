import React, {useState} from 'react';

const Accordion = ({title}) => {
    const [isActive, setIsActive] = useState(true);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    const contentStyle = {
        maxHeight: isActive ? "200px" : 0,
        opacity: isActive ? 1 : 0,
        overflow: "hidden", 
        transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out", 
    };

    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={toggleAccordion}>
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
        </div>
    );
};

export default Accordion;