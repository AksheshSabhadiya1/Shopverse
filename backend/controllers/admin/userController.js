const db = require('../../config/database')


const getAllUsers = async(req, res)=>{
    const [users] = await db.execute('SELECT * FROM users')
    return res.json(users)
}

const getUserById = async(req, res)=>{
    const [users] = await db.execute('SELECT * FROM users WHERE id=?',[req.params.id])
    return res.json(users)
}

const getToggleApprovedStatus = async(req, res) => {
    const [users] = await db.execute('SELECT * FROM users WHERE id=?',[req.params.userid])
    if(users){
        await db.execute('UPDATE users SET approved_status=? WHERE id=?',[!(users.approved_status),req.params.userid])
    }
    return res.end()
}

const deleteUserById = async(req, res)=>{
    try {
        const [result] = await db.execute('DELETE FROM users WHERE id=?',[req.params.id])
        if(result.affectedRows > 0){
            console.log("User Deleted Successfully");
            return res.status(200).json({ message: "User deleted successfully" });
        }else{
            console.log("User Not Found");
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log("User Not Deleted", error);
    }
}

module.exports = {getAllUsers, getUserById, deleteUserById, getToggleApprovedStatus}