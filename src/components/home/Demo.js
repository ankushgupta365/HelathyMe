import React, { useState } from 'react'
import axios from "axios"
import doctor from './doctor.png'
import { Button, Tag } from 'antd';
// import { FileImageOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;
import './demo.css'

const onSearch = (value) => console.log(value);

const Demo = () => {
  const [image, setImage] = useState('')
  const [imageId, setImageId] = useState(null)
  const [dishName, setDishName] = useState(null)
  const [img, setImg] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nutriData, setNutriData] = useState(null)

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
        'Authorization': 'Bearer ac13786cc4e4543eb3ceb1cfc4d644632689eccb',
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

  const getNutriInfo = () => {
    const idimg = { 'imageId': imageId }
    const options = {
      method: 'POST',
      url: 'https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo',
      headers: {
        'Authorization': 'Bearer ac13786cc4e4543eb3ceb1cfc4d644632689eccb',
      },
      data: idimg
    };
    axios.request(options).then(function (response) {
      console.log(response.data)
      setNutriData(response.data);
      // console.log(response.data.nutritional_info.calories)
      // console.log("carbs",response.data.nutritional_info.dailyIntakeReference['CHOCDF'].level)
      // console.log("saturated fat",response.data.nutritional_info.dailyIntakeReference['FASAT'].level)
      // console.log("fat",response.data.nutritional_info.dailyIntakeReference['FAT'].level)
      // console.log("protein",response.data.nutritional_info.dailyIntakeReference['PROCNT'].level)
      // console.log("sugar",response.data.nutritional_info.dailyIntakeReference['SUGAR'].level)

      // console.log(response.data.nutriData.nutritional_info.calories)
    }).catch(function (error) {
      console.error(error);
    });
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <section className='container'>
        <div className='parent-child'>
          <h2>
            One step solution to all your dietary needs
          </h2>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <input type="file" onChange={handleChange} />
            <button onClick={handleApi} >SUBMIT</button>
          </div>
          {imageId && dishName && img && <div style={{ marginTop: '20px' }}>
            <img src={img} widht="120" height="180" />
           <p style={{fontSize: '18px'}}>{dishName}</p> 
            <button onClick={getNutriInfo} >Get Nutri info</button>
          </div>}
        </div>
        {nutriData &&
          <div className='child'>
            <div className="chip">calories: {nutriData.nutritional_info.calories}</div>
            <div className="chip">carbs: {nutriData.nutritional_info.dailyIntakeReference['CHOCDF'].level}</div>
            <div className="chip">Saturated fats: {nutriData.nutritional_info.dailyIntakeReference['FASAT'].level}</div>
            <div className="chip">protein: {nutriData.nutritional_info.dailyIntakeReference['PROCNT'].level}</div>
            <div className="chip">sugar: {nutriData.nutritional_info.dailyIntakeReference['SUGAR'].level}</div>
          </div>}
        <div >
          <img src={doctor} alt="athlete" width="550" height="750"></img>
        </div>
      </section>
    </>
  )
}

export default Demo