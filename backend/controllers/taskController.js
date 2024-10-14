const Task = require('../models/task'); 

// Obtenir toutes les tâches
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches', error });
    }
};

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    
    const newTask = new Task({
        title,
        description
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la création de la tâche', error });
    }
};

// Obtenir une tâche par son ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la tâche', error });
    }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!updatedTask) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Erreur lors de la mise à jour de la tâche', error });
    }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error });
    }
};
