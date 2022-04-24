function comparePassword(currentPassword, newPassword){
    return (currentPassword === newPassword) && (newPassword.length >= 6)
}
module.exports = {comparePassword}
