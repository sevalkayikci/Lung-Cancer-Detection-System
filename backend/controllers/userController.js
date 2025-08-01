import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const addUser = async (req, res) => {
  const { username, first_name, last_name, password, role } = req.body;

  try {
    console.log('req.body:', req.body); // for debugging in POSTMAN
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'this user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      first_name,
      last_name,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'successfully added', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'server error' });
  }

  
};
//get doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({ where: { role: 'Doctor' } });
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { user_id: id } });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//update doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, username } = req.body;

    await User.update(
      { first_name, last_name, username },
      { where: { user_id: id } }
    );

    res.status(200).json({ message: 'Doctor updated successfully' });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
