import 'src/style/components/Atom/CustomButton.css';

function CustomButton({ label, onClickFunc }) {
  return (
    <button 
      className="base-bt" 
      onClick={onClickFunc}
    >
      {label}
    </button>
  );
}

export default CustomButton;