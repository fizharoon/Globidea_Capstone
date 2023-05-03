import React, {useState, useEffect} from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import AccordionContent from '../../Components/Accordion/AccordionContent';
import '../../Pages/phases.css';

class Phase_1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scrape:[],
      header:[],
      subHeadings:[],
      application:[],
      orientation:[],
      isActive: false,
      contentHeight: 0
    }
  };

  componentDidMount(){
    this.fetchScrapedInfo()
  }

  fetchScrapedInfo(){
    console.log('Fetching Scraped Info...')
    // Must white list this link in django settings
    // and include CORS headers
    fetch('http://127.0.0.1:8000/api/saved_data_view')
    .then(response => response.json())
    .then(data => {
        this.setState({
            scrape:data
        })
    })
  }

  toggleAccordion = () => {
    this.setState({
      isActive: !this.state.isActive,
      contentHeight: this.state.contentHeight === 0 ? this.contentDiv.scrollHeight : 0
    });
  };

  render(){
    var info = this.state.scrape;

    var subHeadings = [];
        info.forEach((scrape) => {
            if (subHeadings.indexOf(scrape.sub_header) === -1) {
                // if main header is not found in array, push
                subHeadings.push(scrape.sub_header);
            }
        });

    var application = [];
    var orientation =[];
    info.forEach((scrape) => {
      if(scrape.sub_header === 'Application'){
        application.push(scrape.info);
        //application.push(scrape.gen_url);
      }
      else if(scrape.sub_header === 'Orientation'){
        orientation.push(scrape.info);
      }
    })

    const contentStyle = {
      maxHeight: this.state.isActive ? '200px' : 0,
      display: this.state.isActive ? 'block' : 'none',
      overflow: 'hidden',
      transition: 'maxHeight 0.5s ease-in-out, display 0.5s ease-in-out',
  }

    return(
      <div>
        <h1>Planning to Attend</h1>

        <div className="accordion">
          <Accordion title='Applicaton' />
          {/* <div className="accordion-title" onClick={this.toggleAccordion}>
            <div>Application</div>
            <div>{this.state.isActive ? '-' : '+'}</div>
          </div> */}
          {application.map((content, id) => {
            return(
              <AccordionContent content={content} />
            // <div key={id} className="accordion-content" style={contentStyle} ref={(div) => { this.contentDiv = div; }}>
            //   <li>{content}</li>
            //   {/* <p><a href={url} target="_blank">Learn More</a></p> */}
            // </div>
            )})}
        </div>        
        <div className='accordion'>
        <Accordion title='Orientation' />
        {/* <div className="accordion-title" onClick={this.toggleAccordion}>
            <div>Orientation</div>
            <div>{this.state.isActive ? '-' : '+'}</div>
        </div> */}
          {orientation.map((content, id) => {
            return(
              <AccordionContent content={content} />
            // <div key={id} className="accordion-content" style={contentStyle} ref={(div) => { this.contentDiv = div; }}>
            //   <li>{content}</li>
            //   {/* <p><a href={url} target="_blank">Learn More</a></p> */}
            // </div>
            )
          })}
        </div>
        </div>

    )
  }
}

export default Phase_1;