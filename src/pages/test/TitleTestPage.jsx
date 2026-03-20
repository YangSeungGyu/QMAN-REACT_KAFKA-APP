import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CustomButton from 'src/components/Atom/CustomButton';


function TitleTestPage() {
  //Outlet에서 받은 context 값 받아오기
  const  { mainLayoutContainer, setMainLayoutContainer } = useOutletContext();


  //01.라디오 버튼 색상 변경
  const colors = [
    { name: '기본(회색)', value: '#eee' },
    { name: '빨간색', value: 'red' }
  ];
  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setMainLayoutContainer(prev => ({...prev,
      titleColor: selectedColor
    }));
  };


  //02.TEXT로 입력받아서 타이틀 이름 바꾸기
  const [inputTitleTxt, setInputTitleTxt] = React.useState(""); 
  const handlerTxtChangeBt = () => {
    setMainLayoutContainer(prev => ({...prev,
      titleTxt: inputTitleTxt
    }));
   }


  //03.체크 버튼으로 타이틀 바꾸기
  const [checkedItems, setCheckedItems] = React.useState([]);
  const checkOptions = ['A', 'B', 'C'];
  const handleCheckboxChange = (value) => {
    setCheckedItems(prev => 
      prev.includes(value) ? prev.filter(item => item !== value)/*제거*/ : [...prev, value]/*추가*/
    );
  };

  const handlerCheckToTitleBt = () => {
    const combinedTxt = checkedItems.sort().join(',');
    setMainLayoutContainer(prev => ({...prev,
      titleTxt: combinedTxt
    }));
  };

  const [selectTitle, setSelectTitle] = React.useState("");
  const titleOptions = [
    { label: '--- 선택하세요 ---', value: '' },
    { label: '공지사항', value: 'Notice' },
    { label: '마이페이지', value: 'My Page' },
    { label: '설정', value: 'Settings' },
  ];

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectTitle(selectedValue); //
    if (selectedValue !== "") {
      setMainLayoutContainer(prev => ({
        ...prev,
        titleTxt: selectedValue
      }));
    }
  };

  return (
    <div className="test-container">
        <h3>TopLayout의 타이틀 변경</h3>
        <hr className="line-hr" />{/*============================================ */}   
        {colors.map((color) => (
            <label key={color.value} style={{ marginRight: '10px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="titleColor"
                value={color.value}
                checked={mainLayoutContainer.titleColor === color.value}
                onChange={handleColorChange}
              />
                &nbsp;{color.name}
            </label>
        ))}

      <hr className="line-hr" />{/*============================================ */}

      <input type="text" 
        onChange={(e) => setInputTitleTxt(e.target.value)}
        value={inputTitleTxt}
      />
      <CustomButton 
          label="타이틀 변경" 
          onClickFunc={handlerTxtChangeBt} 
        />

       <hr className="line-hr" />{/*============================================ */}
       
        {checkOptions.map(opt => (
          <label key={opt} style={{ marginRight: '15px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={checkedItems.includes(opt)}
              onChange={() => handleCheckboxChange(opt)}
            />
            &nbsp;{opt}
          </label>
        ))}
        <CustomButton 
          label="적용" 
          onClickFunc={handlerCheckToTitleBt} 
        />
      
        <hr className="line-hr" />{/*============================================ */}

        <select
          onChange={handleSelectChange}
          value={selectTitle}
          style={{padding:'5px',borderRadius:'4px'}}
        >
          {
          titleOptions.map(obj=>(
              <option  
                key={obj.value}
                value={obj.value}>
                {obj.label}
              </option>
            ))
          }
        </select>
    </div>
  );
}

export default TitleTestPage;