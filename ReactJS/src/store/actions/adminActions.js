import actionTypes from './actionTypes';
import { getAllCodeService ,createNewUserService,
    getAllUsers,deleteUserService,editUserService,
    getTopDoctorHomeService,getAllDoctors,saveDetailDoctorService} from '../../services/userService';
import {toast} from 'react-toastify';
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

//Gender
export const fetchGenderStart =  () => {

    return async (dispatch,getState) => {
        try{
            dispatch({type:actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed());
            }
    
        }catch(e){
            dispatch(fetchGenderFailed());
            console.log(e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData

})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
//Position
export const fetchPositionStart =  () => {

    return async (dispatch,getState) => {
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed());
            }
    
        }catch(e){
            dispatch(fetchPositionFailed());
            console.log(e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData

})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
//Role
export const fetchRoleStart =  () => {

    return async (dispatch,getState) => {
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed());
            }
    
        }catch(e){
            dispatch(fetchRoleFailed());
            console.log(e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData

})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
//
export const createNewUser = (data) => {
    return async (dispatch,getState) => {
        try{
            let res = await createNewUserService(data);
            console.log('check create user redux',res)
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                dispatch(saveUserFailed());
            }
    
        }catch(e){
            dispatch(saveUserFailed());
            console.log(e)
        }
    }
}
export const saveUserSuccess = () => ({
    type:actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () => ({
    type:actionTypes.CREATE_USER_FAILDED,
})
//start doing end
export const fetchAllUsersStart =  () => {

    return async (dispatch,getState) => {
        try{
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHomeService(3);
            console.log('check top doctor:',res1);
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }else{
                dispatch(fetchAllUsersFailed());
            }
    
        }catch(e){
            dispatch(fetchAllUsersFailed());
            console.log(e)
        }
    }
}


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users:data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch,getState) => {
        try{
            let res = await deleteUserService(userId);
            console.log('check create user redux',res)
            if(res && res.errCode === 0){
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Delete the user err!")
                dispatch(deleteUserFailed());
            }
    
        }catch(e){
            toast.error("Delete the user err!")
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch,getState) => {
        try{
            let res = await editUserService(data);
            // console.log('check create user redux',res)
            if(res && res.errCode === 0){
                toast.success("Update the user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }else{
                toast.error("Update the user err!")
                dispatch(editUserFailed());
            }
    
        }catch(e){
            toast.error("Update the user err!")
            dispatch(editUserFailed());
            console.log(e)
        }
    }
}
export const editUserSuccess = () => ({
    type:actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type:actionTypes.EDIT_USER_FAILDED
})

export const fetchTopDoctor = () => {
    return async (dispatch,getState) => {
        try{
           let res = await getTopDoctorHomeService('');
           if(res && res.errCode === 0){
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                dataDoctors: res.data,

            })
            
           }else{
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
           }
        }catch(e){
           console.log('',e)
           dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
           })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch,getState) => {
        try{
           let res = await getAllDoctors();
           if(res && res.errCode === 0){
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                dataDr: res.data,

            })
            
           }else{
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
           }
        }catch(e){
           console.log('',e)
           dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
           })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch,getState) => {
        try{
           let res = await saveDetailDoctorService(data);
           if(res && res.errCode === 0){
            toast.success("Save infor detail doctor succeed!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                
            })
           }else{
            console.log('err',res)
            toast.error("Save infor detail doctor error!")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
           }
        }catch(e){
           
           console.log('',e)
           toast.error("Save infor detail doctor error!")
           dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
           })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async(dispatch,getState) => {
        try{
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        }catch(e){
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ',e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}