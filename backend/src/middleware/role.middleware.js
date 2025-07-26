export const authorizeRole = (...role) =>{
  return (req, res, next) =>{
    if(!req.user || !req.user.role){
      return res.status(403).json({message:"Forbidden: user role not found"});
    }
    if(!role.includes(req.user.role)){
      return res.status(403).json({message:"Access denied"});
    }
    next();
  };
}