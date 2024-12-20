import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import {FormattedMessage} from 'react-intl';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils'
import {withRouter} from 'react-router'
class OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleViewDetailDoctor = (doctor) => {
        // console.log('view infor',doctor)
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
        
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let {language} = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        console.log('arrDoctors: ',arrDoctors);
        // console.log('check topdoctorredux',this.props.topDoctorsRedux)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.outstanding-doctor"></FormattedMessage>
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-infor"></FormattedMessage>
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    
                                    const nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    const nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;
                                    
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                                            <div className="customize-border">
                                                <div className="outer-bg">
                                                    <div 
                                                        className="bg-image section-outstanding-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className="position text-center">
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ Xương Khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }

                            
                        </Slider>
                    </div>
                    
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
