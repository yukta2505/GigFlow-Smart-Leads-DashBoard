"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCSV = exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeads = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const json2csv_1 = require("json2csv");
const getLeads = async (req, res) => {
    try {
        const { status, source, search, sort = 'Latest', page = '1' } = req.query;
        const limit = 10;
        const skip = (parseInt(page) - 1) * limit;
        const filter = {};
        if (status)
            filter.status = status;
        if (source)
            filter.source = source;
        if (search)
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        const sortObj = sort === 'Oldest' ? { createdAt: 1 } : { createdAt: -1 };
        const [leads, total] = await Promise.all([
            Lead_1.default.find(filter).sort(sortObj).skip(skip).limit(limit),
            Lead_1.default.countDocuments(filter),
        ]);
        res.json({ leads, total, page: parseInt(page), pages: Math.ceil(total / limit) });
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getLeads = getLeads;
const createLead = async (req, res) => {
    try {
        const lead = await Lead_1.default.create({ ...req.body, createdBy: req.user?.id });
        res.status(201).json(lead);
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createLead = createLead;
const updateLead = async (req, res) => {
    try {
        const lead = await Lead_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lead) {
            res.status(404).json({ message: 'Lead not found' });
            return;
        }
        res.json(lead);
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            res.status(403).json({ message: 'Admins only' });
            return;
        }
        await Lead_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteLead = deleteLead;
const exportCSV = async (req, res) => {
    try {
        const leads = await Lead_1.default.find({});
        const fields = ['name', 'email', 'status', 'source', 'createdAt'];
        const parser = new json2csv_1.Parser({ fields });
        const csv = parser.parse(leads.map(l => l.toObject()));
        res.header('Content-Type', 'text/csv');
        res.attachment('leads.csv');
        res.send(csv);
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.exportCSV = exportCSV;
