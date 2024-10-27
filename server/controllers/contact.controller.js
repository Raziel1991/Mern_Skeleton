import Contact from '../models/contact.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

// Create a new contact
const create = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        return res.status(200).json({
            message: "Contact successfully created!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

// List all contacts
const list = async (req, res) => {
    try {
        let contacts = await Contact.find().select('firstname lastname email created updated');
        res.json(contacts);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

// Middleware to find a contact by ID
const contactByID = async (req, res, next, id) => {
    try {
        let contact = await Contact.findById(id);
        if (!contact)
            return res.status(400).json({
                error: "Contact not found"
            });
        req.profile = contact;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve contact"
        });
    }
};

// Read a single contact's details
const read = (req, res) => {
    return res.json(req.profile);
};

// Update a contact's details
const update = async (req, res) => {
    try {
        let contact = req.profile;
        contact = extend(contact, req.body);
        contact.updated = Date.now();
        await contact.save();
        res.json(contact);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

// Delete a contact
const remove = async (req, res) => {
    try {
        let contact = req.profile;
        let deletedContact = await contact.deleteOne();
        res.json(deletedContact);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


export default { create, contactByID, read, list, update, remove };
