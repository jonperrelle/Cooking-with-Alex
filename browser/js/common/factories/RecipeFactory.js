app.factory('RecipeFactory', function ($http) {

    var recipeObj = {};
    var synth = window.speechSynthesis;
    var voice = synth.getVoices()[0];
    var ingredientIndex = 0;
    var directionIndex = 0;
    var recognition;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var instruction = "";
    var interim_instruction = "";
    var utterThis;

    var firstListItem = function(className) {
        var listType = className.match(/\w+/)[0];
        if (listType === 'direction') {
            listType = 'step';
            directionIndex = 0;
        }
        else {
            ingredientIndex = 0;
        }
        var firstItem = document.querySelector(className).children[0];
        utterThis = new SpeechSynthesisUtterance("The first " + listType + " is " + firstItem.innerHTML);
        utterThis.voice = voice;
        utterThis.pitch = 1;
        utterThis.rate = .8;
        synth.speak(utterThis);
    }
    

      
    if (annyang) {
      var list = ""
      var commands = {
        'ingredients': function () {
            console.log('Here');
            list = ".ingredient-list";
            firstListItem(list);
        },
        'directions': function () {
            list = ".direction-list";
            firstListItem(list);
        },
        'next': function() {
            console.log('here');
            playListItem(list);
        },

        'repeat': function() {
            console.log('here again');
            document.querySelector('p').innerHTML = "This is cool";
        }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback('result', function (userSaid, commandText, phrases) {
        console.log(userSaid);
        console.log(phrases)
      })
      // annyang.addCallback('resultNoMatch', function () {
      //   utterThis = new SpeechSynthesisUtterance("I'm sorry, I did not understand.  Can you please say it again?");
      //   utterThis.voice = voice;
      //   utterThis.pitch = 1;
      //   utterThis.rate = 1;
      //   synth.speak(utterThis);
      // });

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }        


    var playListItem = function (className, listType) {
        var listType = className.match(/\w+/)[0];
        var list = [].slice.call(document.querySelector(className).children, 1);
        
        if (listType === "ingredient") {
            if (ingredientIndex < list.length) { 
              var item = list[ingredientIndex];
              utterThis = new SpeechSynthesisUtterance(item.innerHTML);
              utterThis.voice = voice;
              utterThis.pitch = 1;
              utterThis.rate = 1;
              synth.speak(utterThis);
              ingredientIndex++;
            }
            else {
                ingredientIndex = 0;
                utterThis = new SpeechSynthesisUtterance("There are no more " + listType + "s");
                synth.speak(utterThis);
            }
            
        }

        else if (listType === "direction") {
            if (directionIndex < list.length) { 
              var item = list[directionIndex];
              utterThis = new SpeechSynthesisUtterance(item.innerHTML);
              utterThis.voice = voice;
              utterThis.pitch = 1;
              utterThis.rate = 1;
              synth.speak(utterThis);
              directionIndex++;
            }
            else {
                directionIndex = 0;
                utterThis = new SpeechSynthesisUtterance("There are no more " + listType + "s");
                synth.speak(utterThis);
            }
            
        }

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
