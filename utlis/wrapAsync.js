function wrapAsync(fn){
    return function (req,res,next){
        fn(req,res,next).catch(next);
    }
}
//basic format or syntax

module.exports=wrapAsync;