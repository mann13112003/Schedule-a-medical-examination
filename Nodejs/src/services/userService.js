import bcrypt from 'bcryptjs';
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve,reject) =>{
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e);
        }
    })
}


let handleUserLogin = (email,password) => {
    return new Promise(async(resolve,reject)=>{
        try{
            let userData = {};
            let isExist = await checkUserEmail(email)
            if(isExist){
                //user already exist
                
                let user = await db.User.findOne({
                    attributes: [ 'email','roleId','password'],
                    where: {email: email},
                    raw:true,
                })
                if(user){
                    //compare password
                    let check = await bcrypt.compare(password, user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                    
                }
                
                
            }else{
                //return error
                userData.errCode = 1;
                userData.errMessage = 'Your email is not exist in your system.Please try other email '
                
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
       
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async(resolve,reject) => {
        try{
            let users = ''
            if(userId === 'ALL' ){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        }catch(e){
            reject(e)
        }
    })

}

let createNewUser = (data) =>{
    return new Promise(async(resolve,reject) => {
        try{
            //check email is exist
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used. Plz try another email'
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
            email: data.email,
            password:hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phonenumber: data.phonenumber,
            gender: data.gender === '1' ? true : false,
            roleId: data.roleId,
        })
        resolve({
            errCode: 0,
            errMessage: 'OK'
        })
        }catch(e){
            reject(e)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async(resolve,reject) => {
        let user = await db.User.findOne({
            where: {id: userId},
            raw: false
        })
        if(!user){
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await user.destroy();
        resolve({
                errCode: 0,
                message: 'The user is deleted'
        })
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
}