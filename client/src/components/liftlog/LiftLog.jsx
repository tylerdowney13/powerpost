import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import LiftLogCreate from '../liftlogCreate/LiftLogCreate';
import LiftLogData from '../liftlogData/LiftLogData';

import './liftlog.css';

export default function LiftLog() {
    const {user} = useContext(AuthContext);

    return (
        <div className="liftlog">
            <div className="liftlogWrapper">
                <div className="liftlogTitleContainer">
                    <span className="liftlogTitle">LIFTLOG</span>
                </div>
                <div className="liftlogUserInfoContainer">
                    <div className="liftlogUserInfoBox">
                        <div className="liftlogUsernameContainer">
                            <img className="liftlogUserProfilePicture" src={user.profilePicture} alt="" />
                            <span className="liftlogUsername">{user.username}</span>
                        </div>
                        {user?.liftlogid ? <LiftLogData liftlogid={user.liftlogid} />: <LiftLogCreate /> }
                    </div>
                </div>
            </div>
        </div>
    )
}
