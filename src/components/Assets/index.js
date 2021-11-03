import React, { useEffect, useState } from 'react'
import { AssetsContainer } from './style'
import "antd/dist/antd.css";
import { Card, Modal, Button } from 'antd'

import axios from 'axios'
import { Link } from 'react-router-dom';
import AssetDetail from '../AssetDetail';

function Assets(props){

  let myRef = React.createRef() 
  
  
  const [assetsData, setAssetsData] = useState({
    data: [],
    loading: false
  })

  useEffect(() => {
    setAssetsData({
      loading: true
    })
    axios.get('https://my-json-server.typicode.com/tractian/fake-api/assets') 
      .then(({data}) => {
        setAssetsData({
          data,
          loading: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [assetId, setAssetId] = useState(null);

  const showModal = (e) => {
    let id = e.target.id
    setAssetId(id)   
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const treatingAssetStatus = (status) => {
    switch (status) {
      case 'inAlert':
        return 'em alerta'
      case 'inOperation':
        return 'em operação'
      case 'inDowntime':
        return 'inativo'
      default:
        break;
    }
  }

  const treatingAssetModel = (model) => {
    return model  === 'fan' ? 'Ventilador' : 'Motor' 
  }

  return (
    <AssetsContainer>
      
      <ul>
      {assetsData.loading ? (<h1>Carregando...</h1>) : (
        assetsData.data.map(asset => {
          return (
            <Card
              key={asset.id}
              title={treatingAssetModel(asset.model)} 
              extra={
                <Link to="#" onClick={showModal} ref={myRef} id={asset.id}>Ver mais</Link >
              } 
              className="cardContainer"
            >
              <div className="cardAsset">
                <img src={asset.image} alt="" />
                <div className="infoAsset">
                  <h3>Nome: {asset.name}</h3>
                  <h3>Estado: {treatingAssetStatus(asset.status)}</h3>
                  <h3>Nível de saúde: {asset.healthscore}%</h3>
                </div>
              </div>
            </Card>
          )
        })
      )}
      </ul>
      
      <Modal
       title="Detalhes" visible={isModalVisible} 
       onCancel={handleOk} 
       footer={[
        <Button key="back" onClick={handleOk}>
          Fechar
        </Button>
      ]}>
        <AssetDetail assetId={assetId} />          
      </Modal>
    </AssetsContainer>
  )
}

export default Assets