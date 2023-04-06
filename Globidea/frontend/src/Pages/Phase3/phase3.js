import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import { accordionContent } from './content';
import './styles.css';

const Phase_3 = () => {
    return (
      <div>
        <h1>Phase 3</h1>
        <div className="accordion">
          {accordionContent.map(({title, content}) => (<Accordion title={title} content={content} />))}
        </div>
      </div>
    )
  }
  
  export default Phase_3;
  