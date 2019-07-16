// This is where it all goes :)
let scrollAmt = document.documentElement.scrollTop;
let scrollMax = document.documentElement.scrollHeight - window.innerHeight;

//---------input-------//
let input = {
  scrollY: {
    start:0,
    end: document.documentElement.scrollHeight - window.innerHeight,
    current:0,
  },
  mouseX: {
    start: 0,
    end: window.innerWidth,
    current:0,
  },
  mouseY: {
    start:0,
    end: window.innerHeight,
    current:0,
  }
}

input.scrollY.range = input.scrollY.end - input.scrollY.start;
input.mouseX.range = input.mouseX.end - input.mouseX.start;
input.mouseY.range = input.mouseY.end - input.mouseY.start;

//--------output-------//
let output = {
  x:{
    start:-100,
    end:100,
    current:0,
  },
  y:{
    start:0,
    end:10,
    current:0,
  }
}

output.x.range = output.x.end - output.x.start;
output.y.range = output.y.end - output.y.start;



///------------html---------------///
let block2HTMLCollection = document.getElementsByClassName("block2");

let itemsHTMLCollection = document.getElementsByClassName("parallax-item");
let itemsArray = Array.from(itemsHTMLCollection);
// console.log(itemsArray);


//------------function event----------//

let handleMouseMove = function () {
  input.mouseX.current = event.clientX;
  input.mouseX.fraction = (input.mouseX.current - input.mouseX.start) / input.mouseX.range;
  input.mouseY.current = event.clientY;
  input.mouseY.fraction = (input.mouseY.current - input.mouseY.start) / input.mouseY.range;

  output.x.current = output.x.end - (input.mouseX.fraction * output.x.range);
  output.y.current = output.y.end - (input.mouseY.fraction * output.y.range);
  console.log("x", output.x.current, "y", output.y.current);


  itemsArray.forEach(function(item, k) {
    let depth = parseFloat(item.dataset.depth,10);
    console.log(depth);

    const itemOutput = {
      x: output.x.current - (output.y.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: 10000 - (10000 * depth)
    }

    let xtranslate = itemOutput.x - 50;
    let ytranslate = itemOutput.y - 50;
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'translate('+xtranslate+'%,'+ytranslate+'%)';

  });

}

let handleScroll = function () {
  input.scrollY.current = document.documentElement.scrollTop;
  input.scrollY.fraction = (input.scrollY.current - input.scrollY.start) / input.mouseY.range;

  output.y.current = output.y.start + (input.scrollY.fraction * output.y.range);

  itemsArray.forEach(function(item, k) {
    let depth = parseFloat(item.dataset.depth,10);
    console.log(depth);

    const itemOutput = {
      x: output.x.current - (output.y.current * depth),
      y: output.y.current - (output.y.current * depth),
      zIndex: 10000 - (10000 * depth)
    }

    let ytranslate = itemOutput.y - 50;
    item.style.zIndex = itemOutput.zIndex;
    item.style.transform = 'translate(-50%,'+ytranslate+'%)';

  });
}

//------------ event----------//

// window.addEventListener('mousemove', handleMouseMove);



let handleResize = function () {
  input.mouseX.end = window.innerWidth;
  input.mouseX.range = input.mouseX.end - input.mouseX.start
  input.mouseY.end = window.innerHeight;
  input.mouseY.range = input.mouseY.end - input.mouseY.start
  input.scrollY.end = window.innerHeight;
  input.scrollY.range = input.scrollY.end - input.scrollY.start
}

window.addEventListener('resize', handleResize);

document.addEventListener('scroll', handleScroll);































