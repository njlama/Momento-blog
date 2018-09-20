import React from 'react';
import Button from '@material-ui/core/Button';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import createHistory from 'history/createBrowserHistory';
import '../css/createNewBlog.css';

const history = createHistory();
export default class ArrowNavToDashboard extends React.Component {
    render(){
        return(
            <div className="backArrowDiv">
                <Button variant="fab" color="primary" 
                    onClick={()=> { history.push('/dashboard'); window.location.reload()}}
                    aria-label="Add"
                    >&larr;</Button>
            </div>
        );
    }
}