import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl';

class OutStandingDoctor extends Component {

    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác Sĩ Nổi Bật Tuần Qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
                            </div>
                            <div className='section-customize'>
                                <div className='customize-boder'>
                                    <div className = 'outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>    
                                    <div className='position text-center'>
                                            <div>Giáo sư tiến sĩ no1</div>
                                            <div>Cơ Xương Khớp</div>
                                    </div> 
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
