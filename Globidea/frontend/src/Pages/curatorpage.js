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
            <div className="modal__container-title modal__container">
              <h2>Curator Page<br/></h2>
              <Link to="/"><button className="logout">Logout</button></Link>
            </div>
            <br/>
            <div className="row">              
              <div className="left">
                <div className="border">
                  {/* Form to send link to back-end */}
                  <form method="POST" onSubmit={this.handleCuratorInputLinkSubmit}>
                      <label for="curator_link" id="link" >
                          <h3><b>Insert Link:</b></h3>
                      </label>
                      <input
                          type="url"
                          id="url"
                          name="url"
                          placeholder="https://example.com"
                      ></input>
                      <button type = 'submit'>Scrape Data</button>
                  </form>
                  <br></br><br></br>
                  
                  {/* Select Main Phase */}
                  {/* Update Submit Form */}
                  

                  <label for="phases"><h3><b>Choose a Phase:</b></h3></label>
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
                  <label for="sub-headers"><h3><b>Choose a Sub-Heading:</b></h3></label>
                  <select 
                      name="sub-headers" 
                      id="sub-headers"
                      value={active.sub_header}
                      onChange={this.handleSubHeadingSelect}
                  >
                      <option value="">--Select Category--</option>
                      <option value="Application">Application</option>
                      <option value="Campus Tour/Map">Campus Tour/Map</option>
                      <option value="Cap n Gown">Cap n Gown</option>
                      <option value="Careers">Careers</option>
                      <option value="Class Registration">Class Registration</option>
                      <option value="Clubs">Clubs</option>
                      <option value="Cost/Financial Aid">Cost/Financial Aid</option>
                      <option value="Declare Major">Declare Major</option>
                      <option value="Graduate School">Graduate School</option>
                      <option value="Graduation">Graduation</option>
                      <option value="Health">Health</option>
                      <option value="Housing">Housing</option>
                      <option value="Library">Library</option>
                      <option value="Majors/Minors">Majors/Minors</option>
                      <option value="Meet With a Career Counselor">Meet With a Careeer Counselor</option>
                      <option value="Meet With a Counselor">Meet With a Counselor</option>
                      <option value="Pay Tuition">Pay Tuition</option>
                      <option value="Signing Up/Attending Orientation">Signing Up/Attending Orientation</option>
                      <option value="Student Life">Student Life</option>
                      <option value="Textbooks">Textbooks</option>
                      <option value="Tutoring Center">Tutoring Center</option>

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
            </div>

              {/* Display Data from scrape API Call */}
              <div className="right">
              <h3><b>Scraped Information</b></h3>
                {create.map( (scrape, id) => {
                  return (
                    <div key={id} className="scrape-wrapper flex-wrapper">
                      <label className="label">
                        <div className="tuple" style={{ flex: 1 }}>
                          <input 
                          type="checkbox" 
                          onChange={this.handleCheckbox }
                          value={scrape.id}
                          />
                        </div>
                        <div className="tuple div-table-row"style={{ flex: 7 }}>
                          <span>{scrape.info}</span>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );}
};

export default Curator_Page;