import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import '../../Pages/phases.css';

class Phase4 extends React.Component{
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

    var graduation = [];
    var capnGown = [];
    var careerCounselor = [];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Graduation'){
        graduation.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Cap n Gown'){
        capnGown.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Meet With a Career Counselor'){
        careerCounselor.push([scrape.info, scrape.gen_url]);
      }
    })

    return(
      <div>
        <h1>Finishing Up</h1>

        <div className="accordion">
          <Accordion 
            title='Graduation' 
            content={graduation}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Cap n Gown' 
            content={capnGown}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Meet With a Career Counselor' 
            content={careerCounselor}
          />
        </div>
      </div>
    )
  }
}

export default Phase4;
