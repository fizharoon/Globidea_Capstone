import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import AccordionContent from '../../Components/Accordion/AccordionContent';
import '../../Pages/phases.css';

class Phase_1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scrape:[],
      header:[],
      // subHeadings:[],
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

    var application = [];
    var orientation =[];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Application'){
        application.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Orientation'){
        orientation.push([scrape.info, scrape.gen_url]);
      }
    })

    const contentStyle = {
      maxHeight: this.state.isActive ? "200px" : 0,
      opacity: this.state.isActive ? 1 : 0,
      overflow: 'hidden',
      transition: 'maxHeight 0.5s ease-in-out, opacity 0.5s ease-in-out',
    }

    return(
      <div>
        <h1>Planning to Attend</h1>

        <div className="accordion">
          <Accordion title='Application' onClick={this.toggleAccordion}/>
          
          {application.map(([content, url], id) => {
            return(
              <AccordionContent key={id} content={content} url={url}/>
            )})}
        </div>

        <div className='accordion'>
        <Accordion title='Orientation' />

          {orientation.map(([content, url], id) => {
            return(
              <AccordionContent key={id} content={content} url={url} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Phase_1;