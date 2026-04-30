import React from 'react';
import BaseCalendar from '@/components/Atom/BaseCalendar';
import DatepickerCalendar from '@/components/Atom/DatepickerCalendar';
import { comm } from '@/js/comm.js';
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestPage01.jsx?raw'; //DeleteShowCodeLine


function TestPage01() {

  const today = new Date();
  //기본달력
  const [selectedDate, setSelectedDate] = React.useState(comm.formatDate(today));
  const handleDateChange = (dateValue) => {
    setSelectedDate(dateValue);
    console.log("선택된 날짜:", dateValue);
  };

  //리엑트 데이터피커
  const [selectedDate2, setSelectedDate2] = React.useState(today);
  const handleDateChange2 = (date) => { 
      setSelectedDate2(date);
      if (date) {
        console.log("라이브러리 달력 선택:", comm.formatDate(date));
      }
  };



  return(
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"} />{/*DeleteShowCodeLine*/}
      <div>
        기본 달력
            <BaseCalendar
              value={selectedDate} 
              onChange={handleDateChange} 
            />
        <hr className="line-hr" />{/*============================================ */}  
        리액트 Datepicker
            <DatepickerCalendar
              value={selectedDate2}
              onChange={handleDateChange2}
            />
        <hr className="line-hr" />{/*============================================ */}
       
      </div>
    </>
  );
}
export default TestPage01