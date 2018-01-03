# TIC TAC TOE

## About

Tic-tac-toe is simple, relatively easy to make game. This version connects to a Rails API that allows a user to register, sign in, and save their games. Game logic is made completely in JavaScript. User info and game states are passed to and from the backend via Ajax. The game UI uses jQuery, HTML5, and SCSS with Bootstrap.

## Tech Stack

- HTML5
- SCSS
- JavaScript
- jQuery
- Ajax
- Bootstrap

## Planning & Wireframes
[First version wireframes](https://i.imgur.com/zIMIxeL.jpg). My goal is to make something simple. In the web version, the board takes up a majority of the page. The user rankings and login/register sections are immediately to the right of the board. The login/register section changes according to what the user picks (can be done via radio button to switch forms or link below login button). Rankings show all users by total games won. A new game can be started by pressing the button below the game board.

#### More detailed wireframe: http://invis.io/WCF2TBWAZ

More detailed wireframe to show the base functionality of the game and login/register functions. In this version the new game button appears in a pop-up that activates once the win condition is met.

In the mobile version (which is a stretch goal at this point) the rankings and login are put into a menu button on the top left of the screen. When pressed, the side menu expands to show the login/register sections and rankings. Functionality of the login/register section should be identical to the web version.

### User Stories
Below is a list of possible use cases for the web app.

- As a casual player, I want to go straight to playing so that I have a quick, accessible game to play.
- I want to be able to play a local multiplayer game, so that my friend and I can play tic-tac-toe without having to any paper.
- I want to be able to save my games so I can see my win/lose/tie statistics

### Action Plan
My rough action plan for tackling the project is as follows
- first phase: board object, game logic
- second phase: back-end connections
- third phase: user interface and interacting with the board
- fourth phase: UI polish, testing, rolling deployment

## Dev log
#### Game Logic & Board Object
