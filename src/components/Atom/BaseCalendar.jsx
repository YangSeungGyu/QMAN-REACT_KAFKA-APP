const BaseCalendar = ({ value, onChange }) => {
  return (
    <div>    
      <input 
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)} // 부모에게 변경된 값을 전달
        onKeyDown={(e) => e.preventDefault()}
        style={{ 
          padding: '8px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

export default BaseCalendar;