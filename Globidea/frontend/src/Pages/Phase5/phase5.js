import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import { accordionContent } from './content';
import '../../Pages/phases.css';

const Phase_5 = () => {
    return (
        <div>
           <h1>Moving Forward</h1>
           <div className="accordion">
            {/* <Accordion
                title="help me"
                content={accordionContent.map(({title, content}) => [title, content])}
            /> */}
                {accordionContent.map(({title, content}) => (
                    <Accordion title={title} content={[[content,null]]} />
                ))}
            </div>
           {/* <div className="accordion">
                {accordionContent.map(({title, content}) => (<Accordion title={title} content={content} />))}
            </div> */}
        </div>
    );
};

export default Phase_5;
