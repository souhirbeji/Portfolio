const Skill = require('../models/Skill');

exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSkillById = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSkill = async (req, res) => {
    const skill = new Skill({
        name: req.body.name,
        level: req.body.level,
        category: req.body.category
    });

    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
