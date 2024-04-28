import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = { 
            email: '',
            password: '',
            firstName:'',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
    }
    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event,id) => {
        //bad code
        // eslint-disable-next-line react/no-direct-mutation-state
        // this.state[id]=event.target.value;
        // this.setState({
        //     ...this.state
        // },()=>{
        //     console.log('check bad state:',this.state)
        // })
        //good code
        let copyState = {...this.state};
        copyState[id]=event.target.value;

        this.setState({
            ...copyState
        })
        // console.log(event.target.value,id)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        
        for(let i=0;i<arrInput.length;i++){
            // console.log('check',this.state[arrInput[i]],arrInput[i])
           if(!this.state[arrInput[i]]){
                // eslint-disable-next-line no-unused-vars
                isValid = false;
                alert('Missing parameter:'+arrInput[i]);
                break;
           }
        }
        return isValid;
    }

    hanldeAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === true ){
            //call api create modal
            // console.log('check props child' , this.props);
            this.props.createNewUser(this.state);
            
        }
    }    

    render() {
        // console.log('check child props',this.props);
        // console.log('check child open mosal',this.props.isOpen);
        return (
        <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size='lg'
        >
            <ModalHeader toggle={()=>{this.toggle()}}>Modal title</ModalHeader>
            <ModalBody>

                <div className='modal-user-body'>
                    <div className='input-container'>
                        <label>Email</label>
                        <input 
                            type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event,"email")}}
                            value={this.state.email}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input 
                            type='password'
                            onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                            value={this.state.password}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <label>FirstName</label>
                        <input 
                            type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event,"firstName")}}
                            value={this.state.firstName}
                        ></input>
                    </div>
                    <div className='input-container'>
                        <label>LastName</label>
                        <input 
                            type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event,"lastName")}}
                            value={this.state.lastName}
                        ></input>
                    </div>
                    <div className='input-container max-width-input'>
                        <label>Address</label>
                        <input 
                            type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event,"address")}}
                            value={this.state.address}
                        ></input>
                    </div>
                </div>
                    

            </ModalBody>
            <ModalFooter>
                <Button 
                color="primary" 
                className='px-3' 
                onClick={()=>{this.hanldeAddNewUser()}}
                >Add new </Button>{' '}
                <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>Close</Button>
             </ModalFooter>
        </Modal>
 
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);







