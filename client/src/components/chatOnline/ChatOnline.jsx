import './chatOnline.css';

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://i.pinimg.com/736x/00/ec/6b/00ec6b1a19a8dd9dee3949d4f7b09c1b.jpg" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}
