import React from "react";
import { json } from "react-router-dom";


class Curator_Page extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            scrape:[],
            header:[],
            active:{
                id:'',
                curator_url:'',
                info:'',
                main_header:'',
                sub_header:'',
            },
            editing:false,
            selectedMainHeading:'',
        }
        this.fetchScrapedInfo = this.fetchScrapedInfo.bind(this)
        this.fetchHeaderInfo = this.fetchHeaderInfo.bind(this)
        this.handleMainHeadingSelect = this.handleMainHeadingSelect.bind(this)
        // this.handleCuratorInputLink = this.handleCuratorInputLink.bind(this)
        this.handleCuratorInputLinkSubmit = this.handleCuratorInputLinkSubmit.bind(this)
    };

    componentWillMount(){ //used to make API requests
        this.fetchScrapedInfo()
        this.fetchHeaderInfo()

    }

    fetchScrapedInfo(){
        console.log('Fetching Scraped Info...')
        // Must white list this link in django settings
        // and include CORS headers
        fetch('http://127.0.0.1:8000/api/scraped_data_view')
        .then(response => response.json())
        .then(data => 
            this.setState({
                scrape:data
            })
            )
    }

    fetchHeaderInfo(){
        console.log('Fetching Header Info...')
        fetch('http://127.0.0.1:8000/api/headers')
        .then(response => response.json())
        .then(data =>
                this.setState({
                    header:data
                })
            )
    }

    handleMainHeadingSelect(e){
        const selectedMainHeading = e.target.value;
        const activeHeader = this.state.header.find(header => header.main_header === selectedMainHeading);
        this.setState({
            active: {
                ...this.state.active,
                main_header: selectedMainHeading,
                sub_header: '',
            },
            selectedMainHeading,
            subheadings: activeHeader?.sub_headers || [],
        });
        console.log('subheading:', activeHeader)
    }

    

    // when curator submits link
    handleCuratorInputLinkSubmit(e){
        e.preventDefault()
        //console.log('ITEM: ', this.state.scrape.url)
        const form = e.target;
        const formData = new FormData(form);

        fetch('http://127.0.0.1:8000/api/scraped_data_create', {
            method: form.method,
            body: formData,
            headers: {
                'Content-type':'application/json',
            }
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data)
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }

    render(){

        var create = this.state.scrape;
        var phase = this.state.header;
        var {selectedMainHeading, active} = this.state;

        var mainHeadings = [];
        phase.forEach((header) => {
            if (mainHeadings.indexOf(header.main_header) === -1) {
                // if main header is not found in array, push
                mainHeadings.push(header.main_header);
            }
        });

        const subheadings = phase.find(
            (phase) => phase.main_header === selectedMainHeading
          )?.sub_headers;

        return (
          <div>
            <h1>Curator Page</h1>

            <div class="row">
              <div class="column">
                {/* Form to send link to back-end */}
                <form method="POST" onSubmit={this.handleCuratorInputLinkSubmit}>
                    <label for="curator_link" id="link">
                        Insert Link:
                    </label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                    ></input>
                    <button type = 'submit' >Scrape Data</button>
                </form>
                <br></br>
                
                {/* Select Main Phase */}
                <label for="phases">Choose a Phase:</label>
                <select
                  name="main-headers"
                  onChange={this.handleMainHeadingSelect}
                  value={selectedMainHeading}
                >
                  {mainHeadings.map((mainHeader, index) => {
                    return (
                      <option key={index} value={mainHeader}>
                        {mainHeader}
                      </option>
                    );
                  })}
                </select>

                {/* Sub heading options differ depending on main heading selected */}
                <br/>
                <label htmlFor="sub-headers">Choose a Sub-Category:</label>
                <br/>
                <select 
                    name="sub-headers" 
                    id="sub-headers"
                    value={active.sub_header}
                    onChange={(e)=>this.setState({active: {...active, sub_header:e.target.value}})}
                >
                    <option value="">--Select--</option>
                    {subheadings?.map((subheading, index) => (
                        <option key={index}  value={subheading}>
                            {subheading}
                        </option>
                ))}
                </select>
                <br/>
                <button>Update</button>
              </div>

              {/* Display Data from scrape API Call */}
              <div class="column">
                {create.map(function (scrape, id) {
                  return (
                    <div key={id} className="scrape-wrapper flex-wrapper">
                      <div style={{ flex: 1 }}>
                        <input type="checkbox" />
                      </div>

                      <div style={{ flex: 7 }}>
                        <span>{scrape.info}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );}
};

export default Curator_Page;
