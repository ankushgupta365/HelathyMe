import React, { useState } from 'react'
import axios from "axios"
import doctor from './doctor.png'
import { Button, Modal } from 'antd';
// import { FileImageOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;


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
        'Authorization': 'Bearer 8d46848d01dd3ea3a29bc4a59f5b3008c3f83e0d',
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
        'Authorization': 'Bearer 8d46848d01dd3ea3a29bc4a59f5b3008c3f83e0d',
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
        <div className='child parent-child'>
          <h2>
            One step solution to all your dietary needs
          </h2>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <input type="file" onChange={handleChange} />
            <button onClick={handleApi} >SUBMIT</button>
          </div>
          {imageId && dishName && img && <div style={{ marginTop: '20px' }}>
            <img src={img} widht="120" height="180" />
            <p>{dishName}</p>
            <button onClick={getNutriInfo} >Get Nutri info</button>
          </div>}
        </div>
        {nutriData &&
          <div className='child'>
            <p>calories: {nutriData.nutritional_info.calories}</p>
            <p>carbs: {nutriData.nutritional_info.dailyIntakeReference['CHOCDF'].level}</p>
            <p>Saturated fats: {nutriData.nutritional_info.dailyIntakeReference['FASAT'].level}</p>
            <p>protein: {nutriData.nutritional_info.dailyIntakeReference['PROCNT'].level}</p>
            <p>sugar: {nutriData.nutritional_info.dailyIntakeReference['SUGAR'].level}</p>
          </div>}
        <div className='child'>
          <img src={doctor} alt="athlete" width="550" height="750"></img>
        </div>
      </section>
    </>
  )
}

export default Demo