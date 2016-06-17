app.factory('RecipeFactory', function ($http) {

    var recipeObj = {};
    var synth = window.speechSynthesis;
    var voice = synth.getVoices()[0];
    var index = 0;
    var recognition;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var instruction = "";
    var interim_instruction = "";
    var utterThis;
       
      
    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        'next': function() {
            console.log("here");
          playListItem('.ingredients-list', 'ingredients');
        },

        'repeat': function() {
            console.log('here again');
            document.querySelector('p').innerHTML = "This is cool";
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }        






    var playListItem = function (className, listType) {
        var list = [].slice.call(document.querySelector(className).children);
        if (index < list.length) { 
          var item = list[index];
          utterThis = new SpeechSynthesisUtterance(item.innerHTML);
          utterThis.voice = voice;
          utterThis.pitch = 1;
          utterThis.rate = 1;
          synth.speak(utterThis);
          index++;
        }
        else {
            utterThis = new SpeechSynthesisUtterance("There are no more " + listType);
            synth.speak(utterThis);
            index = 0;
        }
    };







    recipeObj.getAllRecipes = function () {
        return $http.get('/api/recipes')
        .then(function(response) {
            return response.data;
        });
    };

    recipeObj.getOneRecipe = function (id) {
        return $http.get('/api/recipes/' + id)
            .then(function(response) {
                return response.data;
            });
    };

    recipeObj.listIngredient = function () {
        
    };

    recipeObj.listDirection = function () {
        playListItem('.directions-list', 'directions');
    };

    recipeObj.recordInstruction = function () {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();
    
        recognition.onresult = function (e) {
            console.log("In Result");
            if(typeof(e.results) === 'undefined') {
                recognition.onend = null;
                recognition.stop();
                return;
            }
            for (var i = e.resultIndex; i < e.results.length; ++i) {
                if (e.results[i].isFinal) {
                    instruction += e.results[i][0].transcript;
                }
                else {
                    interim_transcript += e.results[i][0].transcript;
                }
            }
            if (/(next)/.exec(instruction)) {
                playListItem('.ingredients-list', 'ingredients');
                instruction = ""
            }
            else {
                instruction === "";
            }
            recipeObj.stopInstruction();
            
        };

        //runs when the voice recognition ends.  Set to null in onresult to prevent it running
        // if there is a successful result
        recognition.onend = function () {
            console.log("Here");
            recipeObj.stopInstruction();
        };
    };

    recipeObj.stopInstruction = function () {
        if (recognition) {
            recognition.stop();
            recognition = null;
        }
        return;
    },

    recipeObj.getCurrentInstruction = function () {
        console.log("HereHereHere", instruction);
        return instruction;
    };

    return recipeObj;

});
