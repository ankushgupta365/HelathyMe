import React,{useState} from 'react'
import { Button, Modal } from 'antd';
import './login.css'
const Login = () => {
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [gender,setGender] = useState('')
  const [age,setAge] = useState('')
  const [height,setHeight] = useState('')
  const [weight,setWeight] = useState('')
  const [bmi,setBmi] = useState('')
  const handleChangefname=(e)=>{
   
   setFname(e.target.value)
  }
  const handleChangelname=(e)=>{
    
    setLname(e.target.value)
   }
   const handleChangegender=(e)=>{
    console.log(e.target.value)
    setGender(e.target.value)
   }
   const handleChangeage=(e)=>{
    
    setAge(e.target.value)
   }
   const handleChangeheight=(e)=>{
    
    setHeight(e.target.value)
   }
   const handleChangeweight=(e)=>{
    
    setWeight(e.target.value)
   }
  const saveBmi = (e)=>{
    e.preventDefault()
    localStorage.setItem("userData", JSON.stringify({fname,lname,gender,age,height,weight}))
    calculateBmi();
   
  }
  const calculateBmi=()=>{
    const data = JSON.parse(localStorage.getItem("userData"))
    const bmi = parseInt(data.weight)/(parseInt(data.height)*parseInt(data.height)/10000)
    alert("Your calculated BMI is "+ bmi)
    setBmi(bmi);
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (<>
    <div className="container">
      {/* {bmi && <h2>Your bmi is {bmi}</h2>} */}
      <form onSubmit={saveBmi}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="fname">First Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="fname" name="firstname" placeholder="Your name.." value={fname} onChange={(e)=>handleChangefname(e)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lname">Last Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="lname" name="lastname" placeholder="Your last name.." value={lname} onChange={(e)=>handleChangelname(e)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="gender">Gender</label>
          </div>
          <div className="col-75">
            <select id="gender" name="gender" value={gender} onChange={(e)=>handleChangegender(e)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="age">Age</label>
          </div>
          <div className="col-75">
            <input type="number" id="age" name="age" placeholder="age" value={age} onChange={(e)=>handleChangeage(e)}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="height">height</label>
          </div>
          <div className="col-75">
            <input type="number" id="height" name="height" placeholder="height" value={height} onChange={(e)=>handleChangeheight(e)} />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="weight">weight</label>
          </div>
          <div className="col-75">
            <input type="number" id="weight" name="weight" placeholder="weight" value={weight} onChange={(e)=>handleChangeweight(e)} />
          </div>
        </div>
        <div className="row">
          <button type="submit">submit</button>
        </div>
      </form>
      
    </div>
    </>
  )
}

export default Login