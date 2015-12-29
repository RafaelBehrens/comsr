TravelMethods = new Mongo.Collection("travelmethods");


if (Meteor.isClient) {

	//timer added using 'Chronos' reactive timer package
	var timer = new Chronos.Timer(100);
	
	//return data from array in order of time added to populate html list
	Template.body.helpers({
    	travellists: function() {
    		return TravelMethods.find({}, {sort: { timestamp: -1}});
    	},
    	/*listarr: function(){
    		var resultArray = [];
    		return listarr;
    	}*/
    	
  	});
  	
  	Template.body.events({
  		//add to database from form
  		"submit .newmethod": function (event) {
  			//prevent default browser submit
  			event.preventDefault();
  			//get values from the form
  			var text = event.target.travmeth.value;
  			TravelMethods.insert({text: text});
  			event.target.travmeth.value = "";
  		},
  		//testing inserting into list using jquery
  		"click .editlist": function() {
  			//$(".timeslot:eq(0)").text("woops");
  			$("li:eq(1)").text("there's");
  			$("li:eq(2)").text("a");
  			$("li:eq(3)").text("way");
  			$("li:eq(4)").text("out!");
  		},
  		//testing inserting into list of certain class using jquery
  		"click .startbtn": function() {
  			$(".timeslot:eq(0)").text(timer);
  		}
	})
  	
  	//inserting into database from Session variable. 	
  	TravelMethods.insert({text: Session.get("counter")});
  	
  	//remove list item from DB
  	Template.travellist.events({
  		"click .delete": function() {
  			TravelMethods.remove(this._id); 
  		},
  	})
  	
  	//provide timer for list template
  	Template.accomplist.helpers({
  		'listtime': function(){
            return runtime=((timer.time.get()/1000)%10).toFixed(2);
        }
  	})
	
	//test return timer
	Template.timer.helpers({
    // counts from 0 to 10 in 10 seconds
    	time: function () {
    		return runtime = ((timer.time.get()/ 1000)% 10).toFixed(2);
                 // drop any decimals
    }   
	});
	
		
	Template.travellist.helpers({
        //return time elapsed for list item
        'listtime': function(){
            return runtime=((timer.time.get()/1000)%10).toFixed(2);
        },
        //change id name of selected item
        'valueID': function(){
        	listid = this._id;
            return listid;          
        }        
    });
    
    /*Template.increment.helpers({
    	'increment': function(){
    		Session.set("counter", Session.get("counter")+1);
    		return Session.get("counter");
    	},    	
    });*/
	
	
	Template.body.events({
		"click .startbtn": function() {
			timer.start();
		}
		
	});
	
	Template.body.events({
		"click .stopbtn": function() {
			timer.stop();
		}	
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
