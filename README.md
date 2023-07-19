# Welcome to _Chirp or Treat_

_Chirp or Treat_ is an animated fashion design game that integrates JavaScript with digital illustration, winning the Stanford CS106AX Graphics Contest in October 2022. Play as a trick-or-treating bird working to mix and match costumes until the timer runs out! 

The Stanford CS106AX Graphics Contest is a class contest held for _Programming Methodologies in JavaScript and Python (Accelerated)_, which challenged students to create a project that was both algorithmically complex and aesthetically pleasing. As part of contest entry guidelines, _Chirp or Treat_ tackled complex algorithms concerning the game's internal timer, frame-by-frame character animation, and game mechanics by utilizing Stanford University's JavaScript [Graphics](JSGraphics.js) and [Random](RandomLib.js) Library. 

The major implementation of _Chirp or Treat_ can be found in [GraphicsContest.js](GraphicsContest.js), which is composed of various helper functions that manage user interactions and the game state. Via Stanford's Graphics Library, the GraphicsContest.js file imports the game's character and costumes as _GImage_ graphical objects, which are all digitally illustrated with Procreate.

The illustrated _GImage_ imports are organized and titled in this repository according to their role as part of the various costumes available in the game. PNG files prefixed with "body_" are costumes designated for the body of the game's character, "prop_" refers to handheld costume props, and "head_" refers to headwear. PNG files labeled with "leg_x" are part of the character's walk cycle. Finally, PNG files labeled as "head.png", "body.png", "wing.png", and "wing2.png" make up the game's bird character and are manipulated throughout the duration of the game to simulate movement.

This project was developed, illustrated, and programmed independently by [lising10](https://github.com/lisaing10).

