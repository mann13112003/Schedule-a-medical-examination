import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';

class TableManageUser extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userRedux: [],
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux()
    }
    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
        console.log('delete the user: ',user)
    }
   

    render() {
        console.log('abc:',this.props.listUsers);
        let arrUsers = this.state.userRedux;
        return (
            <table id = "TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.length>0 &&
                    
                        arrUsers.map((item,index) => {
                            return (
                                <tr key ={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' ><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                        onClick={() => this.handleDeleteUser(item)}
                                        className='btn-delete' ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>

                            )
                        })
                    }
                    
                </tbody>   
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);