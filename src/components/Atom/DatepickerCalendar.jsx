import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react';
import { FaCalendarAlt } from "react-icons/fa";


const DatepickerCalendar = ({ value, onChange }) => {
  
//react-icons 디자인 입히기
const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div 
      onClick={onClick} 
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 14px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        width: '130px',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <span style={{ fontSize: '14px', color: value ? '#333' : '#999' }}>
        {value || "날짜 선택"}
      </span>
      <FaCalendarAlt style={{ color: '#999', fontSize: '16px' }} />
    </div>
  ));


  const maxDt = new Date();
  const minDt = new Date();
  minDt.setFullYear(maxDt.getFullYear() - 1);

  return (
    <div>    
      <DatePicker
        selected={value}
        onChange={(date) => onChange(date)} 
        dateFormat="yyyy-MM-dd"
        maxDate={maxDt}
        minDate={minDt}
        customInput={<CustomInput />}
      />
    </div>
  );
};

export default DatepickerCalendar;