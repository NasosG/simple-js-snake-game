# simple JS snake game
 
This is a simple JavaScript snake game. Two canvases have been created at snake.html ( One for the main game and one that displays the elements of the game (score, level, highscore) ).
The whole functionality is implemented at snake.js where the initialisation and movement of the snake have been implemented, the food spawn after
checking that there are no collisions e.t.c. Finally, you can check or change the simple ( but beautiful, I think :> ) 
design of the project (snake.css).

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) 

## Screenshots

### Screenshot showing the game as it has progressed a bit and player is at level 2 controlling a bigger snake

<div align="center"><img src="images/Screenshot_1.png" alt="image1"></div>

### Screenshot showing the snake at the beginning of the game

<div align="center"><img src="images/Screenshot_2.png" alt="image1"></div>

## Gameplay and Controls

The player controls a square snake on a bordered plane. As it moves forward, it leaves a trail behind, resembling a moving snake. 
The player loses when the snake runs into itself (its tail).<br>
In this version snake wraps around the board. In order for the player to lose when the snake runs into the screen border,
you can change snake.js code. Go to game function and change snakeWrap(true) to snakeWrap(false). You can of course make any other changes you like.
<br><div align="center"><img src="images/snake_wrap.png" alt="image1"></div><br>

### The snake can be moved either by pressing the arrow buttons or w,a,s,d buttons from the keyboard.

<div align="center"><img src="images/controls.png" alt="image1"></div>

## 📝 &nbsp; License

The project is available as open source under the terms of the MIT License.

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © <a href="https://github.com/NasosG" target="_blank">NasosG</a>.
