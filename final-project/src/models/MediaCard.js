/** @jsxImportSource @emotion/react */
import React,{useState} from 'react';
import { css, jsx } from '@emotion/react';
import buildIconURL from '../helpers/buildIconUrl';
import getDate from '../helpers/getDate';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { getCurrUser } from '../redux/selectors';

function MyVerticallyCenteredModal(props) {
  const currUser = useSelector(getCurrUser);
  const addToWatchLater = () => {
    Axios.post('http://localhost:3001/add_to_watch_later_movie', {
        userID: currUser.userID,
        movieID: props.id
    }).then(
        ()=>{
            console.log('success');
        }
    );
  }

  const deleteFromWatchlater = () => {
    Axios.delete(`http://localhost:3001/delete_watch_list/${currUser.userID}/${props.id}`).then(
        ()=>{
            console.log('success');
        }
    );
  }

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
          {!props.iswatchlist && <Button onClick={addToWatchLater}>Add to watch later</Button>}
          {props.iswatchlist && <Button onClick={deleteFromWatchlater}>Remove from watch later</Button>}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }


function MediaCard({name, imagePath, date, overview, id, iswatchlist}) {
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
                id={id}
                iswatchlist={iswatchlist}
            />
        </li>
    );
}

export default MediaCard;