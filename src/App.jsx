import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import './App.css'
import './table.css'

function App() {
  const [data, setData] = useState([])

  //parse CSV data & store it in the component state
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       setData(results.data);
  //     },
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./data.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, [])

  const sumData = () => {
    const selectedRows = data.filter(row => row.Index === 'A5' || row.Index === 'A20');
    const result = (selectedRows[0].Value)+(selectedRows[1].Value)
    return result;
  };

  const divideData = () => {
    // Filter the rows based on the 'Index' value you want to sum
    const selectedRows = data.filter(row => row.Index === 'A7' || row.Index === 'A15');
    const result = (selectedRows[1].Value)/(selectedRows[0].Value)
    return result;
  };

  const multiplyData = () => {
    // Filter the rows based on the 'Index' value you want to sum
    const selectedRows = data.filter(row => row.Index === 'A13' || row.Index === 'A12');
    const result = (selectedRows[0].Value)*(selectedRows[1].Value)
    return result;
  };


  return (
    <div className = "App">
      
      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
    
      {data.length ? (
        <table className ="table">
          <thead>
            <tr>
              <th>Index #</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Index}</td>
                <td>{row.Value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ): null}

      <br></br>

      {data.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Value</th>
              <td></td>
            </tr>
          </thead>
            
            <tbody>
              <td>Alpha</td>
              <td>{sumData()}</td>
            </tbody>

            <tbody>
              <td>Beta</td>
              <td>{divideData()}</td>
            </tbody>

            <tbody>
              <td>Charlie</td>
              <td>{multiplyData()}</td>
            </tbody>

        </table>
      ) : null}
    
    </div>
  )
}

export default App
