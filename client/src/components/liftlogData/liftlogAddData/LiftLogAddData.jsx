import './liftlogadddata.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Modal from '../../../components/modal/Modal';

const LiftLogAddData = ({liftType, liftlogId}) => {
    console.log(liftType)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function closeModalHandler() {
        setModalIsOpen(false);
    }

    const liftDataRef = useRef();

    const handleSubmit = async (e) => {
        const liftDataValue = parseInt(liftDataRef.current.value);

        if (liftType === "Squat" && liftDataValue) {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                await axios.put(`/liftlog/updatesquat/${liftlogId}`, {liftDataValue})
                window.location.reload()
            } catch (error) {
                console.log(error);
            }
        }

        if (liftType === "Bench" && liftDataValue) {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                await axios.put(`/liftlog/updatebench/${liftlogId}`, {liftDataValue})
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }

        if (liftType === "Deadlift" && liftDataValue) {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                await axios.put(`/liftlog/updatedeadlift/${liftlogId}`, {liftDataValue})
                window.location.reload()
            } catch (error) {
                console.log(error);
            }
        }

        if (liftType === "Total" && liftDataValue) {
            try {
                axios.defaults.baseURL = 'https://powerpost-server.herokuapp.com/api';
                await axios.put(`/liftlog/updatetotal/${liftlogId}`, {liftDataValue})
            } catch (error) {
                console.log(error);
            }
        }
        if (!liftDataValue) {
            setModalIsOpen(true)
        }
    }

    return (
        <form className="liftlogDataAddDataContainer" onSubmit={handleSubmit}>
            {modalIsOpen && <Modal text={"Please enter a weight"} onConfirm={closeModalHandler}/>}
            <div className="liftlogDataAddDataInputContainer">
                <input className="liftlogDataAddDataInput" type="text" ref={liftDataRef}/>
            </div>
            <div className="liftlogDataAddDataSpanContainer">
                <span className="liftlogDataAddDataSpan">kg</span>
            </div>
            <div className="liftlogDataAddDataButtonContainer">
                <button className="liftlogDataAddDataButton" type="submit">Add {liftType}</button>
            </div>
        </form>
    )
}

export default LiftLogAddData
