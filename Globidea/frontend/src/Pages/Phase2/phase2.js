import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import '../../Pages/phases.css';

class Phase2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scrape:[]
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

  render=()=>{
    var info = this.state.scrape;

    var orientation = [];
    var housing = [];
    var classRegistration = [];
    var major = [];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Signing Up/Attending Orientation'){
        orientation.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Housing'){
        housing.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Declare Major'){
        major.push([scrape.info, scrape.gen_url]);
      }
    })

    return(
      <div>
        <h1>Getting Started</h1>

        <div className="accordion">
          <Accordion 
            title='Signing Up/Attending Orientation' 
            content={orientation}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Housing' 
            content={housing}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Declare Major' 
            content={major}
          />
        </div>
      </div>
    )
  }
}

export default Phase2;
