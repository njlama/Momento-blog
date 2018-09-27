import React from 'react';
import { NavLink} from 'react-router-dom';
import '../css/footer.css'
export default class Footer extends React.Component {
    render(){
        return(
            <div className="footer">
                <div>
                    <NavLink to="/main-page/about-us" >About us</NavLink>
                </div>

                <div>
                    <NavLink to="/main-page/about-developer" >Developer</NavLink>
                </div>
            </div>
        );
    }
}