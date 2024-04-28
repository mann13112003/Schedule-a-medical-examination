import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService,deleteUserService,editUserService} from '../../services/userService';
import ModalUser from './ModalUser';
import {emitter} from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { compose } from 'redux';
class UserManage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal:false,
            isOpenModalEditUser: false,
            userEdit: {}
        }

    }
    /**Life cycle
     * 1.Run component
     * 2.Did mount(set state)
     * 3.Render
     */

    async componentDidMount() {
        await this.getAllUsersFromReact();

    }

    getAllUsersFromReact = async() =>{
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        }
        // console.log('get user from node.js:',response);
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
        

    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async(data) => {
        try{
            let response = await createNewUserService(data);
            if(response && response.errCode !== 0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModal:false
                })
                emitter.emit('EVENT-CLEAR-MODAL-DATA')
            }
            // console.log('response create user:',response)
        }catch(e){
            console.log(e);
        }
        // console.log('check data from child:',data)
        
    }

    handleDeleteUser = async(user) => {
        console.log('click delete',user)
        try{
            let response = await deleteUserService(user.id);
            if(response && response.errCode === 0){
                await this.getAllUsersFromReact();
            }else{
                alert(response.errMessage)
            }
            console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log('check edit euser',user)
        this.setState({
            isOpenModalEditUser:true,
            userEdit: user,

        })
    }
    doEditUser = async(user) => {
        // let response = await editUserService(user);
        // console.log('click save user',response)
        try{
            let res = await editUserService(user);
            console.log('checkedituser',res)
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser:false
                })
                this.getAllUsersFromReact();
            }else{
                alert(res.errMessage)
            }
        }catch(e){
            console(e)
        }
        
        
        
    }
    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModal}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser && 
                <ModalEditUser
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleUserEditModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                    />}
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}>
                    <i className="fas fa-plus"></i>
                    Add new users
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                   
                        {arrUsers && arrUsers.map((item,index) => {
                            // console.log('eric check map:',item,index)
                            return(
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={()=>this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                    </td>
                                    
                                    
                                </tr>
                                
                            )
                        })

                    }
                </tbody>   
                    
                    
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
