import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import '../../Pages/phases.css';

class Phase5 extends React.Component{
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

    var graduateSchool = [];
    var careers = [];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Graduate School'){
        graduateSchool.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Careers'){
        careers.push([scrape.info, scrape.gen_url]);
      }
    })

    return(
      <div>
        <h1>Finishing Up</h1>

        <div className="accordion">
          <Accordion 
            title='Graduate School' 
            content={graduateSchool}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Careers' 
            content={careers}
          />
        </div>
      </div>
    )
  }
}

export default Phase5;
