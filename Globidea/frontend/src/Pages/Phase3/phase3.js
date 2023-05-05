import React from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import '../../Pages/phases.css';

class Phase3 extends React.Component{
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

    var classRegistration = [];
    var textbooks = [];
    var payTuition = [];
    var library = [];
    var counselor = [];
    var health = [];
    var clubs = [];
    var tutoring = [];

    info.forEach((scrape) => {
      if(scrape.sub_header === 'Class Registration'){
        classRegistration.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Textbooks'){
        textbooks.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Pay Tuition'){
        payTuition.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Library'){
        library.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Meet With a Counselor'){
        counselor.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Health'){
        health.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Clubs'){
        clubs.push([scrape.info, scrape.gen_url]);
      }
      else if(scrape.sub_header === 'Tutoring Center'){
        tutoring.push([scrape.info, scrape.gen_url]);
      }
    })

    return(
      <div>
        <h1>Making Progress</h1>

        <div className="accordion">
          <Accordion 
            title='Class Registration' 
            content={classRegistration}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Textbooks' 
            content={textbooks}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Pay Tuition' 
            content={payTuition}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Library' 
            content={library}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Meet With a Counselor' 
            content={counselor}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Health' 
            content={health}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Clubs' 
            content={clubs}
          />
        </div>

        <div className='accordion'>
          <Accordion 
            title='Tutoring Center' 
            content={tutoring}
          />
        </div>
      </div>
    )
  }
}

export default Phase3;
  