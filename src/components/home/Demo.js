import React, { useState } from 'react'
import axios from "axios"
import doctor from './doctor.png'
// import { FileImageOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;


const onSearch = (value) => console.log(value);

const Demo = () => {
  const [image, setImage] = useState('')
  const [imageId, setImageId] = useState(null)
  const [dishName, setDishName] = useState(null)
  const [img,setImg] = useState(null)


  const handleChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
    setImg(URL.createObjectURL(e.target.files[0]))
  }

  const handleApi = () => {

    const formData = new FormData()
    formData.append('image', image)


    const options = {
      method: 'POST',
      url: 'https://api.logmeal.es/v2/recognition/dish',
      headers: {
        'Authorization': 'Bearer 87e9cf703d15e4f1e72c1de2df4aeabaca36c56f',
      },
      data: formData
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      setImageId(response.data.imageId)
      setDishName(response.data.recognition_results[0].name)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const getNutriInfo=()=>{
    const idimg = {'imageId': imageId}
    const options = {
      method: 'POST',
      url: 'https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo',
      headers: {
        'Authorization': 'Bearer 87e9cf703d15e4f1e72c1de2df4aeabaca36c56f',
      },
      data: idimg
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
      // setImageId(response.data.imageId)
      // setDishName(response.data.recognition_results[0].name)
    }).catch(function (error) {
      console.error(error);
    });
  }
  return (
    <section className='container'>
      <div className='child parent-child'>
        <h2>
          One step solution to all your dietary needs
        </h2>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <input type="file" onChange={handleChange} />
          <button onClick={handleApi} >SUBMIT</button>
        </div>
      </div>
      <div className='child'>
        <img src={doctor} alt="athlete" width="550" height="750"></img>
      </div>
      {imageId && dishName && img && <div>
        {/* <p>{imageId}</p> */}
        <img src={img} widht="120" height="180"/>
        <p>{dishName}</p>
        <button onClick={getNutriInfo} >Get Nutri info</button>
      </div>}
    </section>
  )
}

export default Demo