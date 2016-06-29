window.helpers = (function () {
  const intro = 'The solution to the CATS problem contains precisely';
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let count = [];
  // const alphabet = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z];
  let smallIterations = 0
  let bigIterations = 0;

  let revised = {
    newString: '',
    newCount: []
  };

  function getIterations() {
    let iterations = {
      smallIterations: smallIterations,
      bigIterations: bigIterations
    }
    return iterations;
  }

  const numberConverter = function (number) {
    let zeroThruNineteen = ['zero', 'one', 'two', 'three ','four ', 'five ','six ','seven ','eight ','nine ','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    let twentyThruNinetyNine = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    let integer = Math.floor(number);
    if (integer > -1 && integer < 20) {
      let convertedNumber = zeroThruNineteen[integer];
      return convertedNumber;
    } else if (integer > 19 && integer < 100) {
      let integerAsString = integer.toString();
      let tensPlace = integerAsString.charAt(0);
      let tensPlaceInt = parseInt(tensPlace);
      let onesPlace = integerAsString.charAt(1);
      let onesPlaceInt = parseInt(onesPlace);
      if (onesPlace == '0') {
        let convertedNumber = twentyThruNinetyNine[tensPlaceInt];
        return convertedNumber;
      } else {
        let convertedNumber = twentyThruNinetyNine[tensPlaceInt] + " " + zeroThruNineteen[onesPlaceInt];
        return convertedNumber;
      }
    }
    else if (integer > 99) {
      return "error"
    }
  }

  const letterTemplateGenerator = function(letter, letterCount) {
    let template = '';
    if (letterCount == 1) {
      template = ' ' + numberConverter(letterCount) + " '" + letter + "'";
    } else {
      template = ' ' + numberConverter(letterCount) + " '" + letter + "'s";
    }
    return template;
  }

  const generateAllTemplates = function(countArray){
    let allTemplates = '';
    alphabet.forEach( function (letter, i){
      if (letter == 'z') {
        allTemplates += ' and ' + letterTemplateGenerator(letter,countArray[i]) + '.';
      } else {
        allTemplates += letterTemplateGenerator(letter,countArray[i]) + ',';
      }
    });
    return allTemplates;
  }

  const countAllCharacters = function(string) {
    let newCount = []
    alphabet.forEach( function(letter, index) {
      let search = new RegExp(letter,'gi');
      let hits = string.match(search);
      newCount.splice(index, 1 , hits.length);
    });
    return newCount
  }

  function getRandom () {
    let randNum = Math.random();
    if (randNum < .5) {
      return 1;
    } else {
      return -1;
    }
  }

  function getRandomBig(min, max) {
    return Math.random() * (max - min) + min;
  }

  function bigIteration(string, countArray) {
    bigIterations++;
    console.log('BIG ITERATION START', bigIterations);
    //build an incorrect version of the pangram using the defaults
    let initial = string;
    let initialCount = countArray;
    //correct each letter until its right
    alphabet.forEach( function(letter, index) {
      console.log('starting on ', letter);
      let initialHits = initialCount[index];
      let loopBreaker = 0;
      while (count[index] != initialHits) {
        smallIterations++;
        loopBreaker++;
        if (bigIterations < 5 && loopBreaker > 5000) {
          console.log("exiting because of loop breaker");
          count[index] = initialHits + Math.floor(getRandomBig(-5,5));
          return;
        }
        if (bigIterations < 10 && loopBreaker > 10000) {
          console.log("exiting because of loop breaker");
          count[index] = initialHits + Math.floor(getRandomBig(-5,5));
          return;
        }
        if (bigIterations < 15 && loopBreaker > 30000) {
          console.log("exiting because of loop breaker");
          count[index] = initialHits + Math.floor(getRandomBig(-5,5));
          return;
        }
        if (bigIterations < 20 && loopBreaker > 50000) {
          console.log("exiting because of loop breaker");
          count[index] = initialHits + Math.floor(getRandomBig(-5,5));
          return;
        }

        if (count[index]<=0) {
          count[index] = 1;
        } else if (count[index] >= 99) {
          count[index] = 98;
        } else {
          count[index] += getRandom();
        }
        initial = intro + generateAllTemplates(count);
        initialCount = countAllCharacters(initial);
        initialHits = initialCount[index];

      }
      console.log('finished with ', letter);
    });
    revised.newString = initial;
    revised.newCount = initialCount;
    console.log('finished with big revised string: ', revised.newString, 'revisedCount: ', revised.newCount);
  }

  function solve() {
    console.log('SOLVE START');
    //build an incorrect version of the pangram using the defaults
    alphabet.forEach( function(){
      count.push(Math.floor(getRandomBig(1,99)));
    })
    revised.newString = intro + generateAllTemplates(count);
    revised.newCount =  countAllCharacters(revised.newString);
    while (count != revised.newCount) {
      bigIteration(revised.newString, revised.newCount);
    }
    let solution = revised.newString;
    console.log('holy shit finished:', solution);
    return solution
  }


  //
  // function initialPangram() {
  //   countAllCharacters(intro);
  //   let allTemplates = generateAllTemplates(count);
  //   let initialPangramString = intro + allTemplates;
  //   return initialPangramString;
  // }

  // const iterateOverPangram = function(oldPangram) {
  //   countAllCharacters(oldPangram);
  //   let allTemplates = generateAllTemplates(count);
  //   let newPangram = intro + allTemplates;
  //   iterations++;
  //   console.log(iterations);
  //   return newPangram;
  // }

  // function solve() {
  //   let initial = initialPangram();
  //   let revised = iterateOverPangram(initial);
  //   while (initial != revised) {
  //     initial = revised;
  //     revised = iterateOverPangram(initial);
  //     console.log("initial: ", initial , "revised: ", revised);
  //   }
  //   if (inital == revised){
  //     console.log("solved!");
  //   }
  //   let solvedPangram = revised;
  //   return solvedPangram;
  // }

  const helpers = {
    solve: solve,
    getIterations: getIterations
  };

  return helpers;
})();
