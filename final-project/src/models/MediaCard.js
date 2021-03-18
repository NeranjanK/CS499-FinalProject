/** @jsxImportSource @emotion/react */
import React,{useState} from 'react';
import { css, jsx } from '@emotion/react';
import buildIconURL from '../helpers/buildIconUrl';
import getDate from '../helpers/getDate';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


function MyVerticallyCenteredModal(props) {
    return (
    <div onClick={e => e.stopPropagation()}>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Overview
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {props.overview}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }


function MediaCard({name, imagePath, date, overview}) {
    const [showModal, setShowModal] = useState(false);
    const cardStyle = css`
    margin: 30px;
    background-color: #gray;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 200px;
    text-align: center;
    display: inline-block;
    color: black;
    `

    const handleOpenModal = () =>{
        setShowModal(true);
    };

    const handleCloseModal = () =>{
        setShowModal(false);
        console.log(`showModal: ${showModal}`)
    };

    return(
        <li onClick={handleOpenModal} css={cardStyle}>
            <img src = {buildIconURL(imagePath)}></img>
            <p>{name}</p>
            <p>{getDate(date)}</p>
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={()=>{setShowModal(false)}}
                overview={overview}
            />
        </li>
    );
}

export default MediaCard;