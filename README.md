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

After looking at the example schedule, I modified my plan to match. Below is the plan I followed.

##### Planning
1.  User Stories
1.  Wireframes

##### Set Up
1.  Set up boilerplate
1.  Create Github Repository
1.  Deploy to Github Pages

##### Game Engine
1.  Create Empty Board in JS
1.  Add to Board
    - Turn rotates between x and o
    - Can not choose already occupied spots
1.  Check Board for Winner

##### Authentication
1.  Sign Up (curl then web app)
1.  Sign In (curl then web app)
1.  Change Password (curl then web app)
1.  Sign Out (curl then web page)
1.  All API calls have success or failure messages

##### Game UI
1.  Design a game board
1.  Add a click handler for when a space on the game board is clicked
1.  If the user clicks on a valid space then add their X or O
1.  Do not allow users to add an X or O to an invalid space
1.  Do not allow users to add an X or O to any spaces after the game is over
1.  Update the game engine when the game board is updated
1.  Add messaging for the user when the turn changes
1.  Add messaging for the user when the user clicks on an invalid space
1.  Add messaging for the user when the game is over (win or draw)

##### Game API
1.  Create Game, start new game (curl then web app)
1.  Update Game, play the game (curl then web app)
1.  Get Games (curl then web app)

##### Final Touches
1.  README
2.  Troubleshoot/Debug
3.  Style


## Dev log
### Game Logic & Object
The first step was to model a local game object that worked according to spec. The local game object was modeled to be as close as possible to the object the API expects and returns. Originally, my plan was to build the functionality around a local game object then replace with the object returned by the API calls, but I chose to keep the local game object and seperate it from the API in order to retain offline play capabilities.

For game behaviour I chose to attach prototype functions to the game object, mostly as a challenge to see if I could do it that way, but also since I felt that would be the most efficient. The prototype functions mostly evaluate a set of conditions and return a boolean value, except for one or two functions that use these conditional functions. For example, every click on the game board will run the play function which takes a number betweeen 0-8, and using that as the index, will place the current player token (a property in the game object) to the current index if there is no value there. After that it calls the win check function, which looks at all values in the cell array and compares them to winning conditions.


### User Back-end Connections
I kept the back-end Ajax calls seperate from the rest of the JavaScript code in their own file; one for user authorization, and one for game API. Auth API was a pretty straightforward process, using curl scripts first to test the API, then building a basic html form and attaching jquery event handlers that ran the ajax calls. During this time I also set up the basic structure of the html page.

### UI and Board Interaction
The entire web app is styled with Bootstrap to keep it responsive. The board is split into 3 bootstrap rows, each with 3 bootstrap columns. Both the board and the sidebar are set to take the whole width of the screen is the size of a smartphone. It was difficult to get the board to display properly with even dimensions. After an hour of looking around online, I was able to find a solution.

Interacting with the game squares is handled by a single jQuery event handler. Since I gave each square a 'cell' class, I was able to attach an event handler to all the cells through selecting that one class. What was somewhat difficult was correctly assigning the player token to the clicked square, and passing that value on to the cells array in the game engine. I solved this by giving each square a 'data-value' attribute, which stored a number between 0-8. The function called by the 'cell' event handler takes the value in 'data-value' and uses it as the index when reading and modifying the 'cells' property in the game engine. Reseting the board only required attaching an event handler that calls a reset function.

An interesting piece of functionality is the stats panel. I wanted to show not only total games played, but also games won, games lost, games tied, and any open games available to replay. Calculating win/lose/tie statistics was an interesting challenge because of the way I designed the engine. The GET request for a user's past games returns an array of game objects. The function that determines who won is a prototype of the engine's Game object, the only way I was able to use the function to calculate win/lose stats of past games without completely reworking the engine was to create a temporary Game object and copy the cells from each array object to the temp Game. Then using closures and a counter for win/lose/tie, I used .forEach() and an annonymous callback function to correctly determine the stats.

## To-do for Future Iterations

- Improve mobile UI/UX - scrolling is necessary for some of the user actions. Looking into implementing the burger button, or accordion collapsible panels.

- Multiplayer

- Customizable X/O icons
