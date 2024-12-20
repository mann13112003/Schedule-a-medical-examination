import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomeFooter.scss';

import {FormattedMessage} from 'react-intl';

class HomeFooter extends Component {
    
    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2024 Nguyen Nam.  More infomation.<a href='#'> &#8594;Click here &#8592;</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
