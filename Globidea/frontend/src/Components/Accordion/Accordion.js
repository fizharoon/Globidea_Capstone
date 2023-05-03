import React, {useState} from 'react';

const Accordion = ({title}) => {
    const [isActive, setIsActive] = useState(true);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    const contentStyle = {
        maxHeight: isActive ? contentHeight + 'px' : 0,
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
        </div>
    );
};

export default Accordion;