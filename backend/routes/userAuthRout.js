import { Router } from 'express'
import createAdmin from '../controller/adminController/createAdmin.js'
import adminLogin from '../controller/adminController/adminLogin.js'
import adminLogout from '../controller/adminController/adminLogout.js'
import getAllUser from '../controller/userController/getUser.js'
import deleteUser from '../controller/userController/deleteUser.js'
import userCreate from '../controller/userController/userCreate.js'
import editUser from '../controller/userController/editeUser.js'

const router = Router()

router.get('user', (req, res) => {
  res.send('this is the user 😁😁')
})
router.post('/add-user', userCreate)
router.post('/delete-user/:id', deleteUser)
router.post('/edit-user/:id', editUser)
router.get('/get-all-users',getAllUser)
router.post('/admin-create', createAdmin)
router.post('/admin-login', adminLogin)
router.post('/logout', adminLogout)


export default router
