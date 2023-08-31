/*

Group 21:

Student Name: Vince Loh
Student ID: 102450160

Student Name: Kyle Barthelson 
Student ID: 104035705

Student Name: Nial Jones 
Student ID: 104152769

*/

import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';


export const MenuData = [
    {
        title: 'Home',
        url: '/home',
        cName: 'nav-links',
        icon: <HomeIcon className="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    },

    {
        title: 'Assets',
        url: '/assets',
        cName: 'nav-links',
        icon: <MonetizationOnIcon className="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    },

    {
        title: 'History',
        url: '/history',
        cName: 'nav-links',
        icon: <ReceiptIcon className="nav-icons" style={{ verticalAlign: 'middle', paddingRight: '5px' }} />
    }
]