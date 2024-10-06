import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state= {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen:false,
            

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //this.props.dispatch(actions.fetchGenderStart())

        // try {
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode ===0){
        //         this.setState({
        //             genderArr:res.data
        //         })
        //     }
        //     console.log(res)

        // }catch(e){
        //     console.log(e)
        // }

    }
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenderes = this.props.genderRedux
            this.setState({
                genderArr:arrGenderes,
                gender:arrGenderes && arrGenderes.length>0 ? arrGenderes[0].key : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr:arrPositions,
                position:arrPositions && arrPositions.length>0 ?arrPositions[0].key : ''
               
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr:arrRoles,
                role:arrRoles && arrRoles.length>0 ? arrRoles[0].key : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnchangeImage = (event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectUrl,
                avatar: file
            })
        }
       
    }
    OpenPreviewImage = () =>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen:true,
        })
    }

    onChangeInput = (event,id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        },() =>{
            // console.log('hoidanit',this.state)
        })

    }
    
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        this.props.createNewUser({
            email: this.state.email,
            password:this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId:this.state.position,
        })
        
        //fire redux action 
        console.log('before check',this.state)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email','password','firstName','lastName','phoneNumber','address']
        for(let i=0 ;i<arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('Missing parameter:'+ arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    render() {
        let genders=this.state.genderArr;
        let positions=this.state.positionArr;
        let roles=this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let {email,password,firstName,lastName,phoneNumber,address,
            gender,position,role,avatar,} = this.state
        // console.log('check check',this.state)
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Create User Redux
                </div>
                
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id = "manage-user.add"/></div>
                            <div className='col-12 '>{isLoadingGender === true ? 'Loading gender':''}</div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.email"/></label>
                                <input className='form-control' type='email' value={email} onChange={(event)=>{this.onChangeInput(event,'email')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.password"/></label>
                                <input className='form-control' type='password'  value={password} onChange={(event)=>{this.onChangeInput(event,'password')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.first-name"/></label>
                                <input className='form-control' type='text'  value={firstName} onChange={(event)=>{this.onChangeInput(event,'firstName')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.last-name"/></label>
                                <input className='form-control' type='text'  value={lastName} onChange={(event)=>{this.onChangeInput(event,'lastName')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.phone-number"/></label>
                                <input className='form-control' type='text'  value={phoneNumber} onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}></input>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id = "manage-user.address"/></label>
                                <input className='form-control' type='text' value={address} onChange={(event)=>{this.onChangeInput(event,'address')}}></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.gender"/></label>
                                <select className='form-control'  onChange={(event)=>{this.onChangeInput(event,'gender')}}>
                                    {genders && genders.length>0 && genders.map((item,index) => {
                                        return(
                                            <option key = {index} selected value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.position"/></label>
                                <select className='form-control' onChange={(event)=>{this.onChangeInput(event,'position')}}>
                                    {positions && positions.length>0 && positions.map((item,index) => {
                                        return(
                                            <option key = {index} selected value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.role"/></label>
                                <select className='form-control' onChange={(event)=>{this.onChangeInput(event,'role')}}>
                                    roles{roles && roles.length>0 && roles.map((item,index) => {
                                        return(
                                            <option key = {index} selected value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )

                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id = "manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden onChange={(event)=>this.handleOnchangeImage(event)}></input>
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image' 
                                    style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                    onClick={() => {this.OpenPreviewImage()}}></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className='btn btn-primary'
                                onClick={()=>{this.handleSaveUser()}}
                                ><FormattedMessage id = "manage-user.save"/></button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser></TableManageUser>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
                

            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart:() => dispatch(actions.fetchGenderStart()),

        getPositionStart:() => dispatch(actions.fetchPositionStart()),

        getRoleStart:() => dispatch(actions.fetchRoleStart()),

        createNewUser:(data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
