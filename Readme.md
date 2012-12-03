# The Bonsai.js MatrixGrid

Have you ever had to work with compounding matrices? It&rsquo;s a bit
mind-boggling to try to figure out without being able to visualize it.

Henceforth you will no longer need to walk blind! Allow me to introduce
to you the Bonsai MatrixGrid!

## Simple Usage

``` javascript
var myRect = new Rect(x, y, width, height).fill('random').addTo(stage);
var myRectsMatrix = new MatrixGrid({ matrix: myRect.attr('matrix') });
myRect.on('draw', function () {
  myRectsMatrix.update(myRect.attr('matrix'));
});
```

Voilà! You now have the ability to visualize the matrix of your bonsai
elements with each and every update. Enjoy!


## API

View the [docs](/Skookum/MatrixGrid/blob/master/docs.md)


