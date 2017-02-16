# README

The point of this basic app is to set-up Redux with the create-react-app CLI.

```sh
create-react-app counter-redux-CM
cd counter-redux-CM/
npm install --save redux
npm install --save react-redux
```

- I updated my index.js file as following:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';  // NEW
import { Provider } from 'react-redux'; // NEW

import reducers from './reducers'; // NEW

import App from './components/App'; // moved to new directory


let store = createStore(reducers); // NEW

ReactDOM.render(
	<Provider store={store}> // NEW
  		<App />
	</Provider>
  ,
  document.getElementById('root')
);
```
- I don't yet know if this "works" yet...I have simply created the basics.  My reducer file
looks like this:

```javascript
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	
});

export default rootReducer;
```

  - so it's pretty much blank
- To really check to see if it works, I should try to create my Counter component

- To make my Counter a container and not just a component, I need to do the following:
  - import connect
  - mapStateToProps
  - export connected component, now a container
- This is what I have now...I think I'm on the right track:

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
	render() {
		return (
			<div>Hello from the Counter!!</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		count: state.count
	}
}

export default connect(mapStateToProps)(Counter)
```

- I updated my Counter really quickly to actually show what I want it to show...which is a number
and a button that a user can click to increment it:

```javascript
<div>
	<h2>{this.props.count}</h2>
	<button> + </button>
</div>
```

- I put `this.props.count` because that is what I know I will want my component to eventually show.
- Now I need to write my action.
- Actions take in an argument that, I believe, can be anything that I want it to be.  Because my
counter app just needs to increment by one, I could just pass the actual count.  But, I have a feeling
that people probably pass more than just the value but an object, so that's what I'll do.
- This is my action:

```javascript
export function countUp(obj) {
	return {
		type: 'INCREMENT',
		payload: obj
	}
}
```

- I am using `obj` as my object for now because it just gets it in my head that, for right now, I am 
receiving an object with a count property.  Even if it only has one property, count, I feel better right
now calling it an object so that I remember that the 'count' is in `obj.count`
- I now need to bring my action creator into my container
  - import my action creator and bindActionCreators function
  - write my mapDispatchToProps function
  - add mapDispatchToProps function to connect
- After doing that, I realized that I hadn't actually created a valid reducer yet.  So now I have to do that...

```javascript
// ./reducers/reducer_count.js
export default function(state = 0, action) {
	switch(action.type){
		case 'INCREMENT':
			console.log(action.payload);
			return action.payload + 1
		default:
			return state;
	}
}

// ./reducers/index.js
import { combineReducers } from 'redux';
import CountReducer from './reducer_count';

const rootReducer = combineReducers({
	count: CountReducer
});

export default rootReducer;
```

- I screwed up a couple different things but I think I have a better idea of what's going on.
- First, my action, I originally wrote it to receive an object.  But when I wrote my event handler, 
I was passing it the actual count (`this.props.count`).  The fact that I got the app working was a bit
of luck as I was simply passing the integer and then adding 1 to it.
- my rootReducer wasn't taking in any reducers so after I wrote the reducer, I could set the count key to
my CountReducer.  
- One thing that also tricked me up was the initial state passed into my count reducer.  It always starts
at 0...to make a web app of any kind, I feel like I'd need to somehow initialize state (i.e. the 20 most
recent tweets in that user's feed, etc.)
- I'm going to add a decremement action to see if I'm actually getting this...to do this, I'll need to:
  - create the minus button
  - create the action => produces an object with 'DECREMENT' type
  - add the event handler and update mapDispatchToProps
  - update CountReducer
- Okay, so I have successfully updated my counter to allow it to count down.  Here is what I did in the general 
order that I did them:
  1. create the minus button in `/containers/Counter.js`
  1. create the countDown function (action creator) in `./actions/index.js`
  1. update my CountReducer in `./reducers/reducer_count.js`
  1. import countDown in `/containers/Counter.js`
  1. add countDown to mapDispatchToProps in `/containers/Counter.js`
  1. add onClick event handler to my minus button in `/containers/Counter.js`
- **NOTICE:** there was no need to update my rootReducer because my countDown action spit out a type 
'DECREMENT' and my CountReducer just needed an additional case in the switch statement.  I didn't have to add
another reducer or anything so nothing needed to be added to my rootReducer.
- I updated my store declaration so that I can take a look at the redux dev tools:

```javascript
let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```


















