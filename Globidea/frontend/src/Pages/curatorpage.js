const Curator_Page = () => {
    return (
        <div>
            <h1>Curator Page</h1>
        <div class="row">
            <div class="column">
                <label for="phases">Choose a Phase:</label>
                <br></br>
                <select name="phases" id="phases">
                    <option value="Phase_1">Phase 1</option>
                    <option value="Phase_2">Phase 2</option>
                    <option value="Phase_3">Phase 3</option>
                    <option value="Phase_4">Phase 4</option>
                    <option value="Phase_5">Phase 5</option>
                </select>
                <br></br>
                <label for="subcat">Choose a Sub-Category:</label>
                <br></br>
                <select name="subcat" id="subcat">
                    <option value="application">Phase 1 - Application</option>
                    <option value="orientation">Phase 1 - Orientation</option>
                    <option value="something">Phase 1 - Something</option>
                    <option value="smth">Phase 4</option>
                    <option value="else">Phase 5</option>
                </select>

            </div>
            <div class="column">
                <table>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                </table>
            </div>
        </div>
        </div>
    );
};

export default Curator_Page;
