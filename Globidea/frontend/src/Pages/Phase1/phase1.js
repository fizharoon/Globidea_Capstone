import React, {useState, useEffect} from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import '../../Pages/phases.css';

class Phase_1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scrape:[],
      header:[],
      subHeadings:[],
      // application: [],
      // orientation: [],
      subsection:{
        subHeadings:'',
        info:'',
        url:'',
      },
    }
  };

  componentWillMount(){
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

  render(){
    var info = this.state.scrape;
    var subHeadings = {};

    // info.forEach((scrape) => {
    //   if (subHeadings.indexOf(scrape.sub_header) === -1) {
    //     // if main header is not found in array, push
    //     subHeadings.push(scrape.sub_header);
    //   }

    // });
    info.forEach((scrape) => {
      if (!subHeadings[scrape.sub_header]) {
        subHeadings[scrape.sub_header] = [scrape.info];
      } else {
        subHeadings[scrape.sub_header].push(scrape.info);
      }
    });

    return(
      <div>
        <h1>Planning to Attend</h1>
        {/* {subHeadings.map((subHeader, id) => {
          return (
            <div key ={id} className="accordion">
                <Accordion title={subHeader.sub_header} content={scrape.info} url={scrape.gen_url}/>
              </div>
          )
          })} */}
        
          {/* {info.map((scrape, id) => {
            return (
              <div key ={id} className="accordion">
                <Accordion title={scrape.sub_header} content={scrape.info} url={scrape.gen_url}/>
              </div>
            )
          })} */}
        {Object.entries(subHeadings).map(([subHeader, infoArray], id) => (
        <div key={id} className="accordion">
          <Accordion title={subHeader} content={infoArray.join('\n\n')} url={infoArray[0].gen_url}/>
        </div>
      ))}
      </div>
    )
  }
}

export default Phase_1;