import './dropdownmenu.css';
import { Menu, Settings, ExitToApp, RssFeed, EmojiEvents, Equalizer, MenuBook, FitnessCenter} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function DropDownMenu({user}) {
    const logout = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }

    return (
    <div className="dropdown">
        <div className="dropdownMenuContainer">
            <Menu className="dropdownMenu" fontSize="small"/>
        </div>
        <div className="dropdown-content">

            <Link to="/powerfeed" className="dropdownLink">
                <RssFeed className="dropdownIcon" />
                <span>PowerFeed</span>
            </Link>
            <Link to="/toppowerposts" className="dropdownLink">
                <EmojiEvents className="dropdownIcon" />
                <span>Top PowerPosts</span>
            </Link>
            <Link to="/liftlog" className="dropdownLink">
                <Equalizer className="dropdownIcon" />
                <span>LiftLog</span>
            </Link>
            <Link to="/onermcalculator" className="dropdownLink">
                <FitnessCenter className="dropdownIcon" />
                <span>1RM Calculator</span>
            </Link>
               <Link to="/articles"  className="dropdownLink">
                <MenuBook className="dropdownIcon" />
                <span>Articles</span>
            </Link>
            <Link to="/settings" className="dropdownLink">
                <Settings className="dropdownIcon" />
                <span>Settings</span>
            </Link>
            <Link to="/" onClick={logout} className="dropdownLink">
                <ExitToApp className="dropdownIcon" />
                <span>Logout</span>
            </Link>
        </div>
    </div>
    )
}