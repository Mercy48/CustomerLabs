import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import Select from 'react-select';
import axios from 'axios'

function App() {

  axios.defaults.headers['Content-Type'] = 'application/json';

  const [segemntName, setSegemntName] = useState()
  const [selectedOption, setselectedOption] = useState(null);

  const options = [
    { value: 'schema', label: 'Add schema to segment' },
  ];

  const cityOption = [
    { value: 'villupuram', label: 'Villupuram' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'tiruvannamalai', label: 'Tiruvannamalai' },
    { value: 'tirupathur', label: 'Tirupathur' },
  ];

  const stateOption = [
    { value: 'tamilNadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'anddra', label: 'Anddra' },
    { value: 'aoa', label: 'Goa' },
  ];

  const [input, setInput] = useState([{ firstName: '', lastName: '', gender: '', accountName: '', city: cityOption, state: stateOption }]);

  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption)
  }

  const handleData = (data, index) => {
    let keyName = data.target.name;
    let values = [...input];
    values[index][keyName] = data.target.value;
    setInput(values);

  }

  const handleAddSchema = () => {
    setInput([...input, { firstName: '', lastName: '', gender: '', accountName: '', city: cityOption, state: stateOption }])
  }

  const handleRemove = (index) => {
    const values = [...input];
    values.splice(index, 1);
    setInput(values);
  }

  const handleSaveData = () => {
    let tdata = {
      segment_name: segemntName,
      schema: input.map(({ firstName, lastName }) => ({ firstName, lastName }))
    }
    axios.post("https://webhook.site/51d99991-2742-4c7e-b754-3e942d66d04c", tdata)
      .then(res => {
        console.log('res : ', res);
        alert('success');
      }).catch(err => {
        console.log('err : ', err);
      })
  }


  return (
    <div className="App">
      <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Save Segment
      </button>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Segment Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex bd-highlight">
                <span className='mt-3'>Enter the name of the segment:</span>
                <div className="p-2 flex-fill bd-highlight"></div>
                <input className='form-control'
                  placeholder='Segment Name' name='segment'
                  value={segemntName} onChange={(e) => setSegemntName(e.target.value)} />
              </div>
              <div className="d-flex p-2 bd-highlight">
                <div className="flex-fill bd-highlight">
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                    placeholder='--Select the value--'
                  />
                </div>
              </div>

              {
                selectedOption !== null &&
                input?.map((item, index) => (
                  <div className='d-flex p-2' key={index}>
                    <div className="col-lg-10 card p-1">
                      <div className="flex-fill bd-highlight">
                        <div className="d-flex bd-highlight">
                          <div className="flex-fill bd-highlight">
                            <input className='form-control p-2'
                              placeholder='First Name' name='firstName'
                              value={item?.firstName} onChange={(e) => handleData(e, index)} />
                          </div>
                          <div className=" ml-1 flex-fill bd-highlight">
                            <input className='ml-2 form-control p-2'
                              placeholder='Last Name' name='lastName'
                              value={item?.lastName} onChange={(e) => handleData(e, index)} />
                          </div>
                        </div>
                      </div>
                      <div className="flex-fill bd-highlight mt-2">
                        <div className="d-flex bd-highlight">
                          <span className='p-2'>Gender :</span>
                          <div className="p-2 bd-highlight">
                            <label>
                              <input
                                type="radio"
                                value="Male"
                                name='gender'
                                checked={item?.gender === "Male"}
                                onChange={(e) => handleData(e, index)}
                              />
                              Male
                            </label>
                          </div>
                          <div className="p-2 bd-highlight">
                            <label>
                              <input
                                type="radio"
                                name='gender'
                                value="Female"
                                checked={item?.gender === "Female"}
                                onChange={(e) => handleData(e, index)}
                              />
                              Female
                            </label>
                          </div>
                          <div className="p-2 bd-highlight">
                            <label>
                              <input
                                type="radio"
                                name='gender'
                                value="Other"
                                checked={item?.gender === "Other"}
                                onChange={(e) => handleData(e, index)}
                              />
                              Other
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex-fill bd-highlight">
                        <div className="d-flex bd-highlight">
                          <div className="flex-fill bd-highlight">
                            <input className='form-control p-2'
                              placeholder='Account Name' name='accountName'
                              value={item?.accountName} onChange={(e) => handleData(e, index)} />
                          </div>
                        </div>
                      </div>
                      <div className="flex-fill bd-highlight">
                        <div className="d-flex bd-highlight">
                          <div className="flex-fill bd-highlight">
                            <Select
                              options={item?.city}
                              getOptionLabel={label => label?.label}
                              getOptionValue={value => value?.value}
                              placeholder='--Select the city--'
                            />
                          </div>
                          <div className=" ml-1 flex-fill bd-highlight">
                            <Select
                              options={item?.state}
                              getOptionLabel={label => label?.label}
                              getOptionValue={value => value?.value}
                              placeholder='--Select the State--'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-2'>
                      <div className="flex-fill bd-highlight">
                        <button type="button" className="btn btn-outline-danger"
                          onClick={() => handleRemove(index)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              }
              <button type="button" className="btn btn-primary"
                onClick={handleAddSchema}>Add new schema</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"
                onClick={handleSaveData}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
