import jwt from 'jsonwebtoken';

const generateToken = id => {
  return jwt.sign({ id }, '1iKjbU6JtAnJ5HczI2gp', {
    expiresIn: '30d',
  });
};

export default generateToken;
