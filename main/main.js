'use strict';
function loadAllItems(){
  const message=[{barcode:'ITEM000001',name:'雪碧',unit:'瓶',price:3.00},{barcode:'ITEM000003',name:'荔枝',unit:'斤',price:15.00},{barcode:'ITEM000005',name:'方便面',unit:'袋',price:4.50}];
   return message;
}
function loadPromotions(){
  const promotion=[{
     type: 'BUY_TWO_GET_ONE_FREE',
     barcodes: [
       'ITEM000005',
       'ITEM000001'
     ]},{
     type: 'OTHER_PROMOTION',
     barcodes: [
       'ITEM000003',
       'ITEM000004'
     ]}];
	 return promotion;
}
function handleSpecialCharacters(tags){
	let result = [];
     for(let item of tags){
         if(item.length > 1){
             let {barcode,count} = split(item);   
                push(result,barcode,count);
                }else{
                    result.push(item);
                }           
          }
 
  return inputTagList(result);
}
  
  const inputTagList=(tags)=>{
	 let tag=[];
   for(let item of tags){
      let element=find(tag,item);
      if(element){
        element.count++;
      }else{
      tag.push({barcode:item,count:1});
      }
   }
   return tag;  
  }
  const find=(tags,ch)=>{
    for(let item of tags){
         if(item.barcode ==ch){
           return item;
         }
    }
  return null;
  }
  const split=(ch)=>{
  let arr=ch.split("-");
  return {barcode:arr[0],count:Double(arr[1],10)};
  }
  const push=(result,barcode,count)=>{
   for(let i=0;i<count;i++){
   result.push(barcode);
  }
}

const loadallItems=loadAllItems();
const loadpromotion=loadPromotions();
function isBarcodesValid(inputTagList){
   let result="";
   for(let i=0;i<loadallItems.length;i++){
	  for(let j=0;j<inputTagList.length;j++){
		  if(inputTagList[j].barcode!=loadallItems[i].barcode){
		   result+="can't not found";
		   break;
		  }
	  }
   }
   return result;
}
const createReceiptList=(inputTagList)=>{
   let receiptlist=[];
    for(let i=0;i<loadallItems.length;i++){
	  for(let j=0;j<inputTagList.length;j++){
		 if(inputTagList[j].barcode==loadallItems[i].barcode){
			receiptlist.put(loadallItems[i]);
		 }
	  }
	}
	return receiptlist;
}
var price=[];
var balance=0;
var balances=[];
function calculateTotalPrice(inputTagList,createReceiptList){
	var totalprice=0;//优惠后
	var sumprice=0;//前
	for(let i=0;i<loadpromotion.length;i++){
	  if(loadpromotion[i].type=='BUY_TWO_GET_ONE_FREE'){
		for(let j=0;j<inputTagList.length;j++){
		  for(let k=0;k<createReceiptList.length;k++){
			if(inputTagList[j].barcode=='ITEM000005'||inputTagList[j].barcode=='ITEM000001'){
				if(inputTagList[j].count>2&&inputTagList[j]==createReceiptList[k]){
					 totalprice+=inputTagList[j].count*	createReceiptList[k].price-createReceiptList[k].price;
					 price.push(totalprice);
					 sumprice+=inputTagList[j].count*createReceiptList[k].price;
					 balance+=sumprice-totalprice;
					 balances.push(balance);
				}
			 }else{
		  totalprice+=inputTagList[j].count*createReceiptList[k].price;
		  price.push(totalprice);
	          }
		   }
		}
	  }
	}
}
const finalPrice=(price)=>{
	let sum=0;
	for(let i=0;i<price.length;i++){
	  sum+=price[i];
	}
	return sum;
}
const finalBalancePrice=(balances)=>{
	let sumBalance=0;
	for(let i=0;i<balances.length;i++){
	  sumBalance+=balances[i];
	}
	return sumBalance;
}
function printReceipt(inputTagList){
	let result="";
	result+="***<没钱赚商店>收据***"+" ";
	let receiptlist=createReceiptList(inputTagList);
	for(let i=0;i<inputTagList.length;i++){
		for(let j=0;j<receiptlist.length;j++){
			if(inputTagList[i]==receiptlist[j]){		
		result+="名称："+receiptlist[j].name+"，数量："+inputTagList[i].count+"瓶，单价："+receiptlist[j].price+"（元），小计："+price[i]+"元";	
			result+=" ";
			}
		}
	}
	result+="----------------------"+" ";
	result+="总计："+finalPrice+"（元）"+" "+"节省："+finalBalancePrice+"（元）"+" ";
	result+="**********************";
}