import React from "react";


class Curator_Page extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            scrape:[],
            active:{
                id:'',
                url:'',
                info:'',
            },
            editing:false,
        }
        this.fetchInfo = this.fetchInfo.bind(this)
    };

    componentWillMount(){ //used to make API requests
        this.fetchInfo()

    }

    fetchInfo(){
        console.log('Fetching...')
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

    render(){

        var create = this.state.scrape

        return (
            <div>
                <h1>Curator Page</h1>
                
            <div class="row">
                <div class="column">
                <label for="insertlink" id = "link">Insert Link:</label>
                <input type="text" id="link" name="link"></input>
                <button>Scrape Data</button>
                <br></br>
                {/* with the button click make a call the scrape_date func */}
                <button></button> 
                    <label for="phases">Choose a Phase:</label>
                    <select name="phases" id="phases">
                        {/* Might need to change value for phases to numbers only 1-5 */}
                        <option value="Phase_1">Phase 1</option>
                        <option value="Phase_2">Phase 2</option>
                        <option value="Phase_3">Phase 3</option>
                        <option value="Phase_4">Phase 4</option>
                        <option value="Phase_5">Phase 5</option>
                    </select>
                    <br></br>
                    <label for="subcat">Choose a Sub-Category:</label>
                    <br></br>
                    {/* Preferably would like to auto update the subheadings according to 
                    what main heading/phase was chosen first
                    
                    idea: hide the subheading dropdown and when a value is selected for main heading
                    then the subheading dropdown could appear with the updated values/options*/}
                    <select name="subcat" id="subcat">
                        <option value="application">Phase 1 - Application</option>
                        <option value="orientation">Phase 1 - Orientation</option>
                        <option value="something">Phase 1 - Something</option>
                        <option value="smth">Phase 4</option>
                        <option value="else">Phase 5</option>
                    </select>
                    <br></br>
                    <button>Update</button>
                </div>
                <div class="column">
                    {create.map(function(scrape, id){
                        return(
                            <div key={id} className="scrape-wrapper flex-wrapper">
                                <span>{scrape.info}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            </div>

    )}
};


// const Curator_Page = () => {

    
//     return (
//         <div>
//             <h1>Curator Page</h1>
            
//         <div class="row">
//             <div class="column">
//             <label for="insertlink" id = "link">Insert Link:</label>
//             <input type="text" id="link" name="link"></input>
//             <button>Scrape Data</button>
//             <br></br>
//             {/* with the button click make a call the scrape_date func */}
//             <button></button> 
//                 <label for="phases">Choose a Phase:</label>
//                 <select name="phases" id="phases">
//                     {/* Might need to change value for phases to numbers only 1-5 */}
//                     <option value="Phase_1">Phase 1</option>
//                     <option value="Phase_2">Phase 2</option>
//                     <option value="Phase_3">Phase 3</option>
//                     <option value="Phase_4">Phase 4</option>
//                     <option value="Phase_5">Phase 5</option>
//                 </select>
//                 <br></br>
//                 <label for="subcat">Choose a Sub-Category:</label>
//                 <br></br>
//                 {/* Preferably would like to auto update the subheadings according to 
//                 what main heading/phase was chosen first
                
//                 idea: hide the subheading dropdown and when a value is selected for main heading
//                 then the subheading dropdown could appear with the updated values/options*/}
//                 <select name="subcat" id="subcat">
//                     <option value="application">Phase 1 - Application</option>
//                     <option value="orientation">Phase 1 - Orientation</option>
//                     <option value="something">Phase 1 - Something</option>
//                     <option value="smth">Phase 4</option>
//                     <option value="else">Phase 5</option>
//                 </select>
//                 <br></br>
//                 <button>Update</button>
//             </div>
//             <div class="column">
//                 <table>
//                     {/* heading values would stay hardcoded */}
//                     <tr>
//                         <th>Company</th>
//                         <th>Contact</th>
//                         <th>Country</th>
//                     </tr>
//                     <tr>
//                         <td>Alfreds Futterkiste</td>
//                         <td>Maria Anders</td>
//                         <td>Germany</td>
//                     </tr>
//                     <tr>
//                         <td>Centro comercial Moctezuma</td>
//                         <td>Francisco Chang</td>
//                         <td>Mexico</td>
//                     </tr>
//                 </table>
//             </div>
//         </div>
//         </div>
//     );
// };

export default Curator_Page;
