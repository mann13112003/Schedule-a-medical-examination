import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HandBook.scss';
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl';

class HandBook extends Component {
    
    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm Nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 2</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 4</div>
                            </div>
                             <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'></div>
                                <div>Cơ Xương Khớp 6</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
