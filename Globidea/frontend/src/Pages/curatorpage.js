import React, {useState}from "react";
import './curatorpage.css'
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

class Curator_Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrape:[],
            header:[],
            // subHeadings:[],
            checkedIds:[],
            active:{
                id:'',
                curator_url:'',
                info:'',
                main_header:'',
                sub_header:'',
            },
            isChecked:false,
            editing:false,
            selectedMainHeading:'',
            selectedSubHeading:'',
        }
        
        this.fetchScrapedInfo = this.fetchScrapedInfo.bind(this) // Fetch Scraped Info
        this.fetchHeaderInfo = this.fetchHeaderInfo.bind(this) // Fetch Header Info
        this.handleMainHeadingSelect = this.handleMainHeadingSelect.bind(this) // Main Heading
        this.handleCuratorInputLinkSubmit = this.handleCuratorInputLinkSubmit.bind(this) // Link Button
        this.handleSubHeadingSelect = this.handleSubHeadingSelect.bind(this) // Sub Heading
        this.handleCheckbox = this.handleCheckbox.bind(this) // Checkbox
        this.handleUpdate = this.handleUpdate.bind(this) // Update Button
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
        const selectedSubHeading = this.state.selectedSubHeading;
        //const activeHeader = this.state.header.find(header => header.main_header === selectedMainHeading);
        
        this.setState({
            active: {
                ...this.state.active,
                main_header: selectedMainHeading,
                sub_header: selectedSubHeading,
            },
            selectedMainHeading,
            selectedSubHeading,
            // sub_header: activeHeader?.filter(header => header.main_header === selectedMainHeading),
        });
        console.log('main heading: ', selectedMainHeading)
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
        console.log(formData)
    }

    handleUpdate = (e) => {
      e.preventDefault();
      const { checkedIds, selectedMainHeading, selectedSubHeading } = this.state;
  
      fetch('http://127.0.0.1:8000/api/saved_data_create', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: checkedIds,
            main_header: selectedMainHeading,
            sub_header: selectedSubHeading,
          }),
        })
      .then(response => {
          if(!response.ok){
              throw new Error('Network response was not ok')
          }
          return response.json();
      })
      .then(data => {
          console.log('Data:', data);
      })
      .catch((error) => {
          console.log("Error:", error);
      });
      console.log('ids: ', checkedIds)
      console.log('main: ', selectedMainHeading)
      console.log('sub: ', selectedSubHeading)
  }
  
    handleSubHeadingSelect(e){

      const selectedMainHeading = this.state.selectedMainHeading;
      const selectedSubHeading = e.target.value;
        
        this.setState({
            active: {
                ...this.state.active,
                main_header: selectedMainHeading,
                sub_header: selectedSubHeading,
            },
            selectedMainHeading,
            selectedSubHeading,
        });
        console.log('sub: ', selectedSubHeading)
    }

    handleCheckbox = (e) => {
      e.preventDefault()
      // console.log(e.target.value)
      const id = e.target.value;
      const isChecked = e.target.checked;
      // set array length to active length of checked ID's
      let checkedIds = [...this.state.checkedIds];

      if (isChecked) {
        checkedIds.push(id);
      } else {
        checkedIds = checkedIds.filter((checkedId) => checkedId !== id);
      }

      this.setState({ 
        checkedIds,
      });
      console.log('list of ids: ', checkedIds)
      
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
          // <div style={{backgroundColor: "pink"}}>
          <div>
            <h2>Curator Page<br/></h2>

            <Link to="/"><button className="logout">Logout</button></Link>
            <br/>
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
                <br></br><br></br>
                
                {/* Select Main Phase */}
                {/* Update Submit Form */}
                

                <label for="phases">Choose a Phase:</label>
                <select
                  name="main-headers"
                  onChange={this.handleMainHeadingSelect}
                  value={selectedMainHeading}
                >
                  <option value='' >--Select Category--</option>
                  {/* Add a "--Select Phase--"in the table */}
                  {mainHeadings.map((mainHeader, index) => {
                    return (
                      <option key={index} value= {mainHeader}> 
                        {mainHeader}
                      </option>
                    );
                  })}
                </select>

                {/* Sub heading options differ depending on main heading selected */}
                <br/>
                <label for="sub-headers">Choose a Sub-Heading:</label>
                <select 
                    name="sub-headers" 
                    id="sub-headers"
                    value={active.sub_header}
                    onChange={this.handleSubHeadingSelect}
                >
                    <option value="">--Select Category--</option>
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
                <form id="updateSubmit" onSubmit={this.handleUpdate}>
                <button type='submit'>Update</button>
                </form>
                
            </div>

              {/* Display Data from scrape API Call */}
              <div className="column">
                
                {create.map( (scrape, id) => {
                  return (
                    <div key={id} className="scrape-wrapper flex-wrapper">
                      <div style={{ flex: 1 }}>
                        <input 
                        type="checkbox" 
                        onChange={this.handleCheckbox }
                        value={scrape.id}
                        />
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