app.factory('RecipeFactory', function ($http) {
    var recipeObj = {};
    var synth = window.speechSynthesis;
    var voice = synth.getVoices()[0];
    var ingredientIndex = 0;
    var directionIndex = 0;
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var utterThis;
    var listClass ="";
    var recognition = new SpeechRecognition();
    var directionList;
    var ingredientList;

    console.log("inRecipeFactory");
  

    function playIngredient () { 
        if (ingredientIndex < ingredientList.length) { 
          var item = ingredientList[ingredientIndex];
          if (ingredientIndex === 0 ) utterThis = new SpeechSynthesisUtterance("The first ingredient is       " + item.innerHTML);
          else utterThis = new SpeechSynthesisUtterance(item.innerHTML);
          utterThis.voice = voice;
          utterThis.pitch = 1;
          utterThis.rate = .8;
          synth.speak(utterThis);
          ingredientIndex++;
        }
        else {
            ingredientIndex = 0;
            utterThis = new SpeechSynthesisUtterance("There are no more ingredients");
            synth.speak(utterThis);
        }
            
    }

    function playDirection () {
        
        if (directionIndex < directionList.length) { 
          var item = directionList[directionIndex];
           if (directionIndex === 0 ) utterThis = new SpeechSynthesisUtterance("The first step is       " + item);
          else utterThis = new SpeechSynthesisUtterance(item);
          utterThis.voice = voice;
          utterThis.pitch = 1;
          utterThis.rate = .8;
          synth.speak(utterThis);
          directionIndex++;
        }
        else {
            directionIndex = 0;
            utterThis = new SpeechSynthesisUtterance("There are no more directions");
            synth.speak(utterThis);
        }

    }

    function playListItem (repeat) {
        if (listClass === ".direction-list") {
            if (repeat) directionIndex--;
            playDirection();
        }
        else if (listClass === ".ingredient-list") {
            if (repeat) ingredientIndex--;
            playIngredient();
        }
    }
      
    recipeObj.enableAlex = function () {
        directionList = [].slice.call(document.querySelector(".direction-list").children)
                    .map( item => {
                        return item.innerHTML.match(/[^\,]/g).join("").split(/\./).filter( i => i !== "")
                    })
                    .join().split(",");

        ingredientList = [].slice.call(document.querySelector(".ingredient-list").children);
        if (annyang) {

          console.log('in Annyang');
          var commands = {
            'ingredients': function () {
                ingredientIndex = 0
                listClass = ".ingredient-list";
                playIngredient();
            },
            'directions': function () {
                directionIndex = 0
                listClass = ".direction-list";
                playDirection();
            },
            'next': playListItem,

            'repeat': function() {
                playListItem(true);
            },

            'again': function() {
                playListItem(true);
            },

            'previous': function() {
                playListItem(true);
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
    }      



    recipeObj.getOneRecipe = function (id) {
        return $http.get('/api/recipes/' + id)
            .then(function(response) {
                return response.data;
            });
    };


    return recipeObj;

});


//WebSpeech API
    // recipeObj.enableAlex = function () {
    //     recognition.start();
    // }
    //     recognition.continuous = true;
    //     recognition.interimResults = true;
    //     recognition.onstart = function( e ) {
    //           console.log( e );
    //     };
    //     var final_transcript = '';
    //     recognition.onresult = function( event ) {
    //         var final_transcript = '';
    //         for (var i = event.resultIndex; i < event.results.length; ++i) {
    //           if (event.results[i].isFinal) {
    //                 final_transcript += event.results[i][0].transcript;
    //           } 
    //         }
    //         console.log("Here2", final_transcript.length)
    //         if (final_transcript.match(/ingredients/g)) {
    //             listClass = '.ingredient-list';
    //             firstListItem(listClass);
    //         }
    //         else if (final_transcript.match(/directions/g)) {
    //             listClass = '.direction-list';
    //             firstListItem(listClass);
    //         }

    //         else if (final_transcript.match(/next/g)) {
    //             playListItem(listClass)
    //         }
    //     };
