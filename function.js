function createAbacus() {
    for(let i = 0; i < document.getElementById('draw-group').children.length; i++) {
      document.getElementById('draw-group').children[i].remove();
    }

    const PLACES = ['O','T','H','TH','TTH','L'];
    var elem = document.getElementById('draw-group');
    let HEIGHT = 0; 
    let WIDTH = 0; 

    const COLORS = ['#aa3fd4', '#ed0c53', '#40c74', '#d0947d', '#3993e4', '#64d572'];

    //const NUMBER = $[number];
    const NUMBER = {
      number: 102
    };

    const SHAPES = {
      line: {
        height: 0,
        color: '#000',
        width: 2
      },
      circle: {
        radius: 10,
        color: null,
        stroke: {
          color: null,
          width: 0
        },
      },
      rect: {
        width: 0,
        height: 25,
        color: '#7349c2',
        stroke: {
          color: null,
          width: 0
        },
        radius: 2,
      }
    };
    
    SHAPES.rect.width = (Math.pow(SHAPES.circle.radius , 1.75) * NUMBER.number.toString().length); 
    
    //calculate line
    const arry = [];
    const tempArry = [];

    for (let i = 0; i < NUMBER.number.toString().length; i++) { 
      tempArry.push(parseInt(NUMBER.number.toString().charAt(i)));
    }
    
    const offset = 20;

    SHAPES.line.height = (Math.max(...tempArry) * (SHAPES.circle.radius * 2)) + offset;
    
    //creating container height and width
    HEIGHT = ((Math.max(...tempArry) * (SHAPES.circle.radius * 2)) +  SHAPES.rect.height) + offset;
    WIDTH = SHAPES.rect.width;
    
    let two = new Two({ width: WIDTH, height: HEIGHT }).appendTo(elem);
    let baseRect = two.makeRoundedRectangle((SHAPES.rect.width / 2), (HEIGHT - (SHAPES.rect.height / 2)), SHAPES.rect.width, SHAPES.rect.height, SHAPES.rect.radius);
    baseRect.fill = SHAPES.rect.color;
    baseRect.noStroke();

    //get initial cordinates from where line starts drawing
    const _bottomLineTop = baseRect.getBoundingClientRect().top - SHAPES.circle.radius;

    let xCorrdinate = (SHAPES.rect.width * (100 / parseInt(NUMBER.number.toString().length + 1))) / 100;

    for(let i = 1; i <= parseInt(NUMBER.number.toString().length); i++) {
      let line = two.makeLine((i * xCorrdinate), 0, (i * xCorrdinate), SHAPES.line.height);
      line.linewidth =  SHAPES.line.width;
      line.scale = 1;
      line.stroke =  SHAPES.line.color;

      let text = two.makeText(PLACES[i - 1], ((parseInt(NUMBER.number.toString().length + 1) - i) * xCorrdinate), (_bottomLineTop + offset + 5), {size: 20, fill: '#fff'});
      arry.push({xCorrdinate: i * xCorrdinate, elmt: line}); 
    }
    
    //Creating Buds
    let arryBuds = {};
    for (let i = 0; i < NUMBER.number.toString().length; i++) {
      arryBuds[i] = [];
      let _height = _bottomLineTop; 
      let _xPoints =  arry[i].xCorrdinate;
      let _length =  parseInt(NUMBER.number.toString().charAt(i));
      SHAPES.circle.color = COLORS[i];

      for (let j = 0; j < _length; j++) {
        let circle = two.makeCircle(_xPoints, _height, SHAPES.circle.radius);
        _height =  circle.getBoundingClientRect().top - SHAPES.circle.radius;
        circle.fill = SHAPES.circle.color;
        circle.opacity = 1;
        circle.noStroke();
        arryBuds[i].push(circle);
      }
    }

two.update();

//             let sTime = eTime = Date.now();
//             let ANIM_TIME = 2000;
    

//             //Animating the components here
//             two.bind('update', function(frameCount) {
      
//               eTime = Date.now();
//     let tDiff = (eTime - sTime);

//     if(tDiff >= ANIM_TIME){
//       tDiff = ANIM_TIME;
//       two.pause();
//     }
//                if(tDiff <= ANIM_TIME) {
      
//               //Line Animation
//               arry.forEach((item, index) => {
//                 setTimeout(() => {
//                   if(item.elmt.scale <= 1) {
//                     const _per = 10 * frameCount;
//                     item.elmt.scale = _per / 100;
//                   }
//                 }, 500 * index);
//               });

//               //rectangle animation
//               if(arry[0].elmt.scale === 1) {
//                 const _per = 10 * frameCount;
//                 baseRect.scale = _per / 100;
//               } 

//               //buds animation
//               if(baseRect.scale <= 1){
//                 let setTime = 0;
//                 for(let rootKey in arryBuds) {
//                   setTimeout(() => {
//                     for(let key in arryBuds[rootKey]) {
//                       setTimeout(() =>  {
//                         arryBuds[rootKey][key]['opacity'] = 1;
//                       }, 100 * key)
//                     };
//                   }, 1000 * rootKey);
//                 };
//               }
//               }
//             }).play();
    setTimeout(() => {
      two.pause();
    }, 10000 * Math.max(...tempArry));
  }
  
  setTimeout(() => {
    createAbacus();
    //document.getElementById('question').innerHTML = NUMBER.question;
  }, 10);