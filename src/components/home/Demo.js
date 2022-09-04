import React, { useState } from 'react'
import axios from "axios"
import doctor from './doctor.png'
// import { FileImageOutlined } from '@ant-design/icons';
// import { Input, Space } from 'antd';
// const { Search } = Input;


const onSearch = (value) => console.log(value);

const Demo = () => {
  const [image, setImage] = useState('')

  const handleChange = (e) => {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }

  const handleApi = () => {

    // //call the api
    // const url = 'api.logmeal.es/v2/recognition/dish';
    // const headers = {Authorization: "Bearer 87e9cf703d15e4f1e72c1de2df4aeabaca36c56f"}

    const formData = new FormData()
    formData.append('image', image)

    // axios.post(url, headers,formData).then(result => {
    //   console.log(result.data)
    //   alert('success')
    // })
    //   .catch(error => {
    //     alert('service error')
    //     console.log(error)
    //   })


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
    </section>
  )
}

export default Demo