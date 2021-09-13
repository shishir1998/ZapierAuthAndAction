const GetOrder = (z, bundle)=>{
	
	
    var order_id = bundle.inputData.order_id;
    var url='https://api.otterwaiver.com/waivers/'+order_id;
    return z.request(url,{
    method:'GET'
}).then(response =>{return z.JSON.parse(response.content)});
    
        
};

module.exports={
 
key:'GetOrder',
noun:'Order',
display:{
    label:'Get waivers',
    description:'Get waiver by ID',
    important:true
},
operation:{
    inputFields: [
    {key: 'order_id', required: true, label: 'waiverID', helpText: 'Input Waiver id'}
    
    ],
    
    sample:{'Status':'Success'},                
    perform:GetOrder
}

};