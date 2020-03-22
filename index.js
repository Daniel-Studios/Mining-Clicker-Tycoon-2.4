window.onload=function() {
inner=0;
text=document.getElementById("perc");
loop=setInterval(looping,52);
};
function looping(){
inner++;
text.innerHTML=inner+"%";
if(inner==100){
clearInterval(loop);
text.style.color="gold";
}}
function loading() {
    setTimeout(() => {
        loader.style.display = "block";
    },1);
    setTimeout(() => {
        main.style.display = "none";
    },1);
    setTimeout(() => {
        loader.style.display = "none";
    },6450);
    setTimeout(() => {
        main.style.display = "block";
    },6451);
}
$(document).ready(function() {
    $.fn.changeClass =function(class1,class2,_callBack){
        // My custom plugin to change element class and return to old after 750ms 
       var elem=$(this);
       
       // Remove old class
       elem.removeClass(class1);
       
       // Add new class
       elem.addClass(class2);
       
       setTimeout(function(){
           // Remove new class
           elem.removeClass(class2);
           
           // Return old class
           elem.addClass(class1);
           
           if(typeof(_callBack)!="undefined"){
               _callBack();
           }
                    
       },750);
    };
    var screen={
        shop:function(){
            /// switch to shope Screen
            $("#mainScreen").hide();
            $("#shopScreen").fadeIn();
        },
        main:function(){
            // switch to shope Screen
            $("#shopScreen").hide();
            $("#mainScreen").fadeIn();
        }
    };
    var status={
        // Hack it no proplem Enjoy *_- 
        money:0,
        hash:0,
        clickPower:5,
        upgradePrice:250
    };   
    
    var devices ={
        "Noob Miner":{
            power:2,price:250,count:0
        },
        "Recruit Miner":{
            power:5,price:750,count:0
        },
        "Veteran Miner":{
            power:10,price:1300,count:0
        },
        "Pro Miner":{
            power:17,price:2200,count:0
        },
        "Phoenix Miner":{
            power:25,price:2800,count:0
        },
        "Super Miner":{
            power:39,price:4800,count:0
        }
    };
    
    var refresh={
        money:function(){
            $(".money").text(status.money);
        },
        hash:function(){
            $(".hashPower").text(status.hash);
        },
        upgradePrice:function(){
            $("#upgradePrice").text(status.upgradePrice);
        },
        devices:function(){
            $("#devices").text("");
            allCount=0;
            for(var key in devices){
                if(devices[key].count != 0){
                    $("#devices").append(key +"("+devices[key].count+")<br />");
                    allCount+=devices[key].count;
                } 
            } 
                   
           // if player didnt buy any device
           if($("#devices").text().length===0){
              $("#devices").text("No mining devices yet!");
           }
           else{
              $("#devices").append("All: "+allCount);
           }
        },
        shopDevices:function(){
          $("#shopDevices").text("");
          for(var key in devices){
            var device = devices[key];
            $("#shopDevices").append('<div class="alert alert-dark" id="offers"><h5 class="h5">'+key+'</h5><h6 class="h6">'+device.power+' GH/s</h6><h6 class="h6">'+device.price+'$</h6><h6 class="h6">You have: '+device.count+'</h6><button class="buyBtn btn btn-success" id="buyBtn" title="Buy!" hovertag="Buy!" value="'+key+'">Buy!</button></div>');
          }
       },
       buttonPower:function(){
           $("#buttonPower").text(status.clickPower);
       }
    };            
                      
    $("#shopBtn").click(function(){
       screen.shop();
        
        // Back button
        $("#returnBtn").click(function(){
            screen.main();                        
            refresh.devices();
        });
        function shopeBtn(){
        refresh.shopDevices();
        
        var btns = $(".buyBtn");        
        btns.on("click",function(){
          // get info 
          var alert=$(this).parent();
          var device = devices[this.value];
                             
          // check if money enough
          if(status.money>=device.price){
                                
          // Reduced price from money
          status.money-= device.price;
        
          // increase power
          status.hash+=device.power;
            
          // increase count
          device.count+=1;
          
          refresh.money();
          refresh.hash();
                   
          alert.changeClass("alert-dark","alert-success",function (){
               // increase devices price 
              device.price+=Math.floor(device.price /3);    
              shopeBtn();
              
          });
                         
         }
         else{
            alert.changeClass("alert-dark","alert-danger");
                                         
         }
       });
       }
       shopeBtn();
    });
    
    $("#upgradeBtn").click(function(){
            // check if money enough to upgrade 
            if(status.money>=status.upgradePrice){
            // Increass click power 
            status.clickPower+= Math.round(status.clickPower/2);

            // Reduced money 
            status.money-=status.upgradePrice;
            
            // Increase upgrade price 
            status.upgradePrice+=Math.floor(status.upgradePrice/2);
            
            refresh.money();
            refresh.buttonPower();
            refresh.upgradePrice();     
            
           $("#upgradeBtn").changeClass("btn-dark","btn-success");
        }  
        else{
           $("#upgradeBtn").changeClass("btn-dark","btn-danger");
        }
    });
    
    // Earn button
    $("#earn").click(function(){
        status.money+=status.clickPower;
        refresh.money();
    });

    // alert close button
    $("#alertClose").click(function(){
        $("#alert").fadeOut();
    });
    
     // mining 
    setInterval(function(){
        status.money+=Math.floor(status.hash/3);
        refresh.money();
    },50);
});
document.onload;
window.onload;
loading();
