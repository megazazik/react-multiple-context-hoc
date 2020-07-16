# react-multiple-context-hoc

[![npm version](https://badge.fury.io/js/react-multiple-context-hoc.svg)](https://badge.fury.io/js/react-multiple-context-hoc)

Library to get multiple values from react context via HOC.

You can easy get any number of values from react context inside functional components using `useContext`, but classes can get only one value. To solve this problem you can use this HOC.

```tsx
import React from 'react';
import withContext from 'react-multiple-context-hoc';

class MyComponent extends React.Component<{
	stringPropName: string;
	numberPropName: number;
}> {
	render() {
		return (
			<span>
				{this.props.stringPropName} {this.props.numberPropName}
			</span>
		);
	}
}

const stringContext = React.createContext<string>('');
const numberContext = React.createContext<number>(0);

const WrappedComponent = withContext({
	stringPropName: stringContext,
	numberPropName: numberContext,
})(MyComponent);
```
