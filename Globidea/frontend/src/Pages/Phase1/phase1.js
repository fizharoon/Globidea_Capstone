import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
<<<<<<< HEAD
import { accordionContent } from './content';
=======
>>>>>>> back-end
import '../../Pages/phases.css';

class Phase1 extends React.Component{
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

    var application = [];
    var financialAid = [];
    var studentLife = [];
    var campus = [];
    var majorsAndMinors = [];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Application'){
        application.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Cost/Financial Aid'){
        financialAid.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Student Life'){
        studentLife.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Campus Tour/Map'){
        campus.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Majors/Minors'){
        majorsAndMinors.push([scrape.info, scrape.gen_url]);
      }
    })

    return(
      <div>
        <h1>Planning to Attend</h1>

        <div className="accordion">
          <Accordion 
            title='Application' 
            content={application}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Cost/Financial Aid' 
            content={financialAid}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Student Life' 
            content={studentLife}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Campus Tour/Map' 
            content={campus}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Majors/Minors' 
            content={majorsAndMinors}
          />
        </div>
      </div>
    )
  }
}

export default Phase1;