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
- first phase: model game object, create game logic
- second phase: back-end connections
- third phase: user interface and interacting with the board
- fourth phase: UI polish, testing, rolling deployment

## Dev log
### Game Logic & Object
The first step was to model a local game object that worked according to spec. The local game object was modeled to be as close as possible to the object the API expects and returns. Originally, my plan was to build the functionality around a local game object then replace with the object returned by the API calls, but I chose to keep the local game object and seperate it from the API in order to retain offline play capabilities.

For game behaviour I chose to attach prototype functions to the game object, mostly as a challenge to see if I could do it that way, but also since I felt that would be the most efficient. The prototype functions mostly evaluate a set of conditions and return a boolean value, except for one or two functions that use these conditional functions. For example, every click on the game board will run the play function which takes a number betweeen 0-8, and using that as the index, will place the current player token (a property in the game object) to the current index if there is no value there. After that it calls the win check function, which looks at all values in the cell array and compares them to winning conditions.



### Back-end Connections

I kept the back-end Ajax calls seperate from the rest of the JavaScript code in their own file; one for user authorization, and one for game API. 
