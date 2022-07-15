$(document).ready(function() {
  const jsonData= require('./data.json'); 
    function sortByFrequencyAndRemoveDuplicates(array) {
        var frequency = {}, value;
    
        // compute frequencies of each value
        for(var i = 0; i < array.length; i++) {
            value = array[i];
            if(value in frequency) {
                frequency[value]++;
            }
            else {
                frequency[value] = 1;
            }
        }
    
        // make array from the frequency object to de-duplicate
        var uniques = [];
        for(value in frequency) {
            if(value !== ' ') {
                uniques.push(value);
            }
        }
    
        // sort the uniques array in descending order by frequency
        function compareFrequency(a, b) {
            return frequency[b] - frequency[a];
        }
    
        return uniques.sort(compareFrequency);
    }

    function getWordList(array, language) {
        switch (language) {
            case 'de':
              site = "https://www.dict.cc/?s=";
              break;
            case 'es':
              site = "https://www.wordreference.com/esit/";
              break;
          }
          console.log(site)
        
        array = $.map( array, function( a ) {
            wordHtml = "<li class='list-group-item'><a href='" + site + a + "' target='_blank'>" + a + "</a></li>"
            $( "#output" ).append( wordHtml );
          });
    }
    
    var site = ''
    $( ".btn-outline-primary" ).click(function() {
        $( ".btn-outline-primary" ).addClass( "disabled" );
      });
    $( "#de" ).click(function() {
        var message = $('#text-input').val();
        var stringArray = message.split(/(\s+)/);
        getWordList(stringArray, 'de')
      });
    $( "#es" ).click(function() {
        var message = $('#text-input').val();
        var stringArray = message.split(/(\s+)/);
        getWordList(sortByFrequencyAndRemoveDuplicates(stringArray), 'es')
      });

    $( "#clear" ).click(function() {
        $('#text-input').val('')
        $('.container').find('#output').empty()
        $( ".btn-outline-primary" ).removeClass( "disabled" );
      });
});
