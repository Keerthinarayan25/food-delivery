export const authorizeRole = (...roles) =>{
  return (req, res, next) =>{
    let role = null;
    if(req.user && req.user.role){
      role = req.user.role;
    }else if(req.restaurant && req.restaurant.role){
      role = req.restaurant.role;
    }

    if(!role){
      return res.status(403).json({message: "Access denied, no role found"});
    }
    if(!roles.includes(role)){
      return res.status(403).json({message: `Access denied`});
    }
    next();
  };
}