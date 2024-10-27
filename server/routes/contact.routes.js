import express from 'express';
import contactCtrl from '../controllers/contact.controller.js';

const router = express.Router();

// Route to get the list of contacts and create a new contact
router.route('/api/contacts')
    .get(contactCtrl.list)
    .post(contactCtrl.create);

// Route to get, update, or delete a specific contact by ID
router.route('/api/contacts/:contactId')
    .get(contactCtrl.read)
    .put(contactCtrl.update)
    .delete(contactCtrl.remove);

// Middleware to find a contact by ID before executing route handlers
router.param('contactId', contactCtrl.contactByID);

export default router;
