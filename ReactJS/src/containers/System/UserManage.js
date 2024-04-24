import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
import ModalUser from './ModalUser';
class UserManage extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal:false,
        }

    }
    /**Life cycle
     * 1.Run component
     * 2.Did mount(set state)
     * 3.Render
     */

    async componentDidMount() {
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


    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser
                isOpen = {this.state.isOpenModal}
                toggleFromParent = {this.toggleUserModal}

                />
                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}>
                    <i class="fas fa-plus"></i>
                    Add new users
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                <table id="customers">
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
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i class="fas fa-trash"></i></button>
                                    </td>
                                    
                                    
                                </tr>
                                
                            )
                        })

                        }
                        
                    
                    
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
