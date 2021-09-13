const GetOrder2 = (z, bundle)=>{
	
	
    var url='https://api.otterwaiver.com/waivers';
    return z.request(url,{
    method:'GET'
}).then(response =>{return z.JSON.parse(response.content)});
    
        
};
module.exports={
 
    key:'GetOrder2',
    noun:'Order',
    display:{
        label:'Get waivers',
        description:'Get all waiver',
        important:true
    },
    operation:{
        
        sample:{'Status':'Success'},                
        perform:GetOrder2
    }
    
    };