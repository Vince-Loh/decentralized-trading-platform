import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';


export const MenuData = [
    {
        title: 'Home',
        url: '/home',
        cName: 'nav-links',
        icon: <HomeIcon classname="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    },

    {
        title: 'Assets',
        url: '/assets',
        cName: 'nav-links',
        icon: <MonetizationOnIcon classname="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    },

    {
        title: 'History',
        url: '/history',
        cName: 'nav-links',
        icon: <ReceiptIcon classname="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    }
]