const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };
const generateRefferalToken = (obj)=>{
  return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: "1d" });
}
const decryptToken = (token)=>{
  return jwt.verify(token, process.env.JWT_SECRET);
}
  
module.exports = { generateToken, generateRefreshToken, generateRefferalToken,decryptToken };
