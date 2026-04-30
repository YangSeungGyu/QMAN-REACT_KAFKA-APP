import React, { useState, useRef } from "react";
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestExcel.jsx?raw'; //DeleteShowCodeLine
import axios from 'axios';
import '@/style/views/test/TestExcel.css'


function TestExcel() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [resultData, setResultData] = useState([]);
  const fileInputRef = useRef(null);

  const sampleName = "upload_sample.xlsx";
  const sampleUrl = "/download/"+sampleName;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name); 
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("파일을 선택해주세요.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8199/test/uploadExcel", formData);
      if (response.status === 200) {
        setResultData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return(
    <>
     <ShowCode sourceCode={sourceCode|| "is not found"} />{/*DeleteShowCodeLine*/}
     <div className="test-excel-container">
      <div className="test-excel-wrapper">
        <div className="upload-group">
          <span className="excel-label">엑셀 업로드</span>
          <div className="input-wrapper">
            <input type="text" className="text-input" value={fileName} readOnly />
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          </div>
          <button className="button-secondary" onClick={() => fileInputRef.current.click()}>파일 선택</button>
          <button className="button-primary" onClick={handleUpload}>업로드</button>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <a href={sampleUrl} className="download-button">양식 다운로드</a>
      </div>

      {resultData.length > 0 && (
        <div className="result-container">
          <div className="table-wrapper">
            <table className="result-table">
              <thead>
                <tr>
                  <th>time</th>
                  <th>name</th>
                  <th>testNum</th>
                </tr>
              </thead>
              <tbody>
                {resultData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.time}</td>
                    <td>{row.name}</td>
                    <td>{row.testNum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default TestExcel