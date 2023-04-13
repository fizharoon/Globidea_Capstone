import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import { accordionContent } from './content';
import '../../Pages/phases.css';

const Phase_1 = () => {
    return (
        <div>
            <h1>Planning to Attend</h1>
            <div className="accordion">
                {accordionContent.map(({title, content}) => (<Accordion title={title} content={content} />))}
            </div>
        </div>
    );
};


export default Phase_1;
