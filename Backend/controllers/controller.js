const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { createAccessToken } = require("../libs/jwt")

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    const token = await createAccessToken ({id:user._id});

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

const register = async (req,res) => {
    const{email, password, type}=req.body;
    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
          return res.status(409).json({message:"El usuario ya existe"});
        }
        const passwordHash = await bcrypt.hash(password,10)

        const newUser = new User({
            email,
            password:passwordHash,
            type,
        });
      const userSaved = await newUser.save();
      const token =  await createAccessToken ({id:userSaved._id});
      res.cookie('token',token);
      
      res.json({
        id:userSaved._id,
        email:userSaved.email,
        type:userSaved.type,
        createdAt:userSaved.createdAt,
        updateAt:userSaved.updatedAt, 
      });
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const logout = async (req,res) => {
    res.cookie('token',"",{
      expires: new Date(0)}
    )
    return res.SendStatus()
};

const profile = async (req,es)=>{
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({message: "Usuario no encontrado"
  });
  return res.json({
    id:userFound._id,
    email:userFound.email,
    createdAt:userFound.createdAt,
    updatedAt:userFound.updatedAt,
  })

}

module.exports ={login,register,logout,profile};