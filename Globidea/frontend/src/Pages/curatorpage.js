import React from "react";
import './curatorpage.css'

class Curator_Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrape:[],
            header:[],
            subHeadings:[],
            active:{
                id:'',
                curator_url:'',
                info:'',
                main_header:'',
                sub_header:'',
            },
            editing:false,
            selectedMainHeading:'',
            selectedSubHeading:'',
        }
        this.fetchScrapedInfo = this.fetchScrapedInfo.bind(this)
        this.fetchHeaderInfo = this.fetchHeaderInfo.bind(this)
        this.handleMainHeadingSelect = this.handleMainHeadingSelect.bind(this) // Main Heading
        this.handleCuratorInputLinkSubmit = this.handleCuratorInputLinkSubmit.bind(this) // Link Button
        this.handleSubHeadingSelect = this.handleSubHeadingSelect.bind(this) // Sub Heading
        //this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this) // Update Button
       //this.handleCheckboxSelect = this.handleCheckboxSelect.bind(this) // Checkbox
    };

    componentWillMount(){ //used to make API requests - GET
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
            subHeadings: activeHeader?.filter(selectedMainHeading),
        });
        console.log('main heading: ',this.selectedMainHeading)
    }

    // handleSubHeadingSelect = (e) => {
    //     const selectedSubHeading = e.target.value;
    //     // const { selectedMainHeading, active, header } = this.state;
      
    //     // const subHeadingOptions = header
    //     //   .find((phase) => phase.main_header === selectedMainHeading)
    //     //   .sub_headers.filter(
    //     //     (subheader) => subheader !== active.sub_header
    //     //   );
    //     //   console.log('active main from sub log: ', selectedMainHeading)
    //     //   console.log('sub: ', selectedSubHeading)
      
    //     this.setState({
    //       active: {
    //         ...this.state.active,
    //         sub_header: selectedSubHeading,
            
            
    //       },
          
    //     });
    //     console.log('sub: ',this.selectedSubHeading)
    //   };

      handleSubHeadingSelect(e){
        const selectedSubHeadings = Array.from(
            e.target.selectedOptions,
            option => option.value
        );
        this.setState({
            active: {
                ...this.state.active,
                sub_header: selectedSubHeadings,
            },
            selectedSubHeadings,
        });
    }

    // when curator submits link
    handleCuratorInputLinkSubmit(e){
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);

        fetch('http://127.0.0.1:8000/api/scraped_data_create', {
            method: form.method,
            body: formData,
        })
        .then(data => {
            console.log('Data:', data)
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json();
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

        // Fix Later
        // const subheadings = phase.find(
        //     (phase) => phase.main_header === selectedMainHeading
        //   )?.sub_headers;

        return (
          <div>
            <h1>Curator Page</h1>

            <div className="row">
              <div className="column">
                {/* Form to send link to back-end */}
                <form method="POST" onSubmit={this.handleCuratorInputLinkSubmit}>
                    <label for="curator_link" id="link">
                        Insert Link:
                    </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                    ></input>
                    <button type = 'submit'>Scrape Data</button>
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
                <label for="sub-headers">Choose a Sub-Category:</label>
                <br/>
                <select 
                    name="sub-headers" 
                    id="sub-headers"
                    value={active.sub_header}
                    onChange={this.handleSubHeadingSelect}
                >
                    <option value="">--Select--</option>
                    <option value="Application">Application</option>
                    <option value="Orientation">Orientation</option>

                    {/* Fix Later */}
                    {/* { subheadings?.map((subHeader, index) => (
                        <option key={index}  value={subHeader}>
                            {subHeader}
                        </option>
                ))} */}
                </select>
                <br/>
                <button>Update</button>
              </div>

              {/* Display Data from scrape API Call */}
              <div className="column">
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