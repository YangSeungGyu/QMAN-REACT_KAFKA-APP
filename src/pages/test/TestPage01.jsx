import React from 'react';
import BaseCalendar from 'src/components/Atom/BaseCalendar';
import DatepickerCalendar from 'src/components/Atom/DatepickerCalendar';
import CustomButton from 'src/components/Atom/CustomButton';
import ModalLayout from 'src/components/Modal/ModalLayout';
import BodyTestSample from 'src/components/Modal/BodyTestSample';
import { comm } from 'src/context/comm.js';


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



  const handleConfirm = () => {
    setIsModalOpen(false);
  };

const [isModalOpen, setIsModalOpen] = React.useState(false);

  return(
    <>
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
        <div>
            <CustomButton 
            label="샘플모달열기" 
            onClickFunc={()=>setIsModalOpen(true)} 
          />
          <CustomButton 
            label="customAlert" 
            onClickFunc={()=>comm.customAlert('테스트1')} 
          />
          <CustomButton 
            label="customAlert" 
            onClickFunc={()=>comm.customConfirm('테스트2',()=>alert(1))} 
          />
        </div>
      </div>

      <ModalLayout 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="테스트모달1"
          modalBody={<BodyTestSample onConfirm={handleConfirm} onCancel={() => setIsModalOpen(false)} />}
        />
    </>
  );
}
export default TestPage01