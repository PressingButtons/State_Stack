# State_Stack
Rollback and state driven design study.

The intention behind this package, is to streamline rollback implementation to my javascript game project(s).
The "StateStack" module ids of states provided by a state generating method; the method updated by a given interval.

## The Premise 
Instead of rendering each frame as the logic executes, the idea behind this library is for the logic to execute instantenously while 
logging the changes that would take place at a given interval. As such this module is intended to work within a web worker context.
The worker would proivde a function that would genrate states as well as an interval to execute each "Step".
