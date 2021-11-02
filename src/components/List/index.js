import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Skeleton, Avatar } from 'antd'

import { Container } from './style'

function List({typeOfList}) {
  const [data, setData] = useState({
    loading: false,
    typeOfList: []
  })

  const [company, setCompany] = useState({
    loading: false,
    data: [],
  })

  useEffect(() => {
    setData({
      loading: true,
    })
    axios.get(`https://my-json-server.typicode.com/tractian/fake-api/${typeOfList}/`)
      .then(({data}) => {
        setData({
          loading: false,
          typeOfList: data,
        })
      })
      .catch(err => {
        console.log(err);
      })
  }, [typeOfList])

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/tractian/fake-api/companies/`)
    .then(({data}) => {
      setCompany({
        loading: false,
        data,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }, [])

  

  const treatingCompanyId = (id) => {
    const result = company.data.findIndex(element => {
      return element.id === id 
    })
    let { name } = result !== -1 ? company.data[result] : 'não informado'
    return name; 
  }

  return (
    <Container>
    {data.loading || company.loading ? (
      <>
        <Skeleton loading={data.loading} avatar active className="loadingCard">
            <Card
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
              
            />  
        </Skeleton>
        <Skeleton loading={data.loading} avatar active className="loadingCard">
            <Card
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
              
            />  
        </Skeleton>
        <Skeleton loading={data.loading} avatar active className="loadingCard">
            <Card
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
              
            />  
        </Skeleton>
      </>
    ) : (
      data.typeOfList.map(value => {
        return (
          <Card
            className="userCard"
            key={value.id}
            title={value.name}
          >
            { value.email ? (
              <p>E-mail: {value.email}</p>
            ) : (
              <></>
            )}
            { value.companyId  && !company.loading ? (
              <p>Empresa: {treatingCompanyId(value.companyId)}</p>
            ) : (
              <></>
            )}

          </Card>
        
        )
      })
    )}
  </Container>

  )
}

export default List