import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import { accordionContent } from './content';
import '../../Pages/phases.css';

const Phase_3 = () => {
    return (
      <div>
        <h1>Making Progress</h1>
        <div className="accordion">
            {/* <Accordion
                title="help me"
                content={accordionContent.map(({title, content}) => [title, content])}
            /> */}
                {accordionContent.map(({title, content}) => (
                    <Accordion title={title} content={[[content,null]]} />
                ))}
            </div>
      </div>
    )
  }
  
  export default Phase_3;
  