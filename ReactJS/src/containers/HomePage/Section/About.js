import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './About.scss';

import {FormattedMessage} from 'react-intl';

class About extends Component {
    
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyen thong noi ve BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/FyDQljKtWnI" 
                            title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>CÀ PHÊ KHỞI NGHIỆP VTV1</p>
                        <p>Chương trình được phát sóng lúc 6h55 ngày 14/11/2018 trên VTV1</p>
                    </div>
                        
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
