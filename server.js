'use strict';
const Restify=require('restify');
const server=Restify.createServer({
	name:'VanillaMessenger'
});
const PORT=process.env.PORT||3000;
server.use(Restify.jsonp());
server.use(Restify.bodyParser());
const config=require('./config');
const FBeamer=require('./fbeamer');
const f=new FBeamer(config);
server.get('/',(req,res,next)=>{
	f.registerHook(req,res);
	return next();
});
server.post('/',(req,res,next)=>{
	f.incoming(req,res,msg=>{
		f.txt(msg.sender,`Hey you just said ${msg.message.text}`);
	});
	return next();
});

server.listen(PORT,()=> console.log(`Vanilla running on port ${PORT}`));