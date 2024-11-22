const User = require('../models/userModel');

exports.get_users = async () => {
    const usersData = await User.find();
    return usersData;
};

exports.get_user = async (userId) => {
    const user = await User.findById(userId);

    if(!user) throw new Error("Não existe um usuário com esse id!")

    return user;
};

exports.update_user = async (userId, username, email, password) => { 
    const userEmail = await User.findOne({ email: email, _id: { $ne: userId } });

    if (userEmail) {
        throw new Error('Esse email já está cadastrado');
    }

    const userUpdate = await User.findByIdAndUpdate(userId, {username: username, email: email, password: password}, { new: true } );

    if (!userUpdate) {
        throw new Error('Usuário não encontrado para atualizar');
    }

    return userUpdate;
}

exports.update_role = async (userId, role) => { 
    const userUpdate = await User.findByIdAndUpdate(userId, {role: role}, { new: true } );

    if (!userUpdate) {
        throw new Error('Usuário não encontrado para atualizar');
    }

    return userUpdate;
}

exports.delete_user = async (userId) => {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new Error(`Usuário com ID ${userId} não encontrado para deletar`);
    }

    return deletedUser; // Retorna o documento deletado
};
