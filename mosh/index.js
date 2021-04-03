// OBJECT LITERAL SYNTAX
// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     // behaviour
//     draw: function(){
//         console.log('draw');
//     }
// };

// circle.draw();


// FACTORY FUNCTION
// function createCircle(radius){
//     return {
//     radius,
//     draw: function(){
//         console.log('draw');
//     }
//     };

// }

// const circle = createCircle(1);
// circle.draw()

// CONSTRUCTOR FUNCTION
function Circle(radius){
    // console.log('this', this);
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}
const another = new Circle(1)
another.draw()