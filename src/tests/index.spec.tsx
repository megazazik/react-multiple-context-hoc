import * as React from 'react';
import tape from 'tape';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';
import withContext from '..';

configure({ adapter: new Adapter() });

tape('withContext', (t) => {
	const context1 = React.createContext<string>('empty');
	const context2 = React.createContext<number>(100);

	const MyComponent = spy(
		(_: { c1: string; c2: number; p1: boolean }) => null
	);
	const Wrapped = withContext({ c1: context1, c2: context2 })(MyComponent);

	t.ok(MyComponent.notCalled);

	render(<Wrapped p1={true} />);

	t.equal(MyComponent.callCount, 1);
	t.deepEqual(MyComponent.args[0][0], { c1: 'empty', c2: 100, p1: true });

	render(
		<context1.Provider value="not-empty">
			<context2.Provider value={21}>
				<Wrapped p1={false} />
			</context2.Provider>
		</context1.Provider>
	);

	t.equal(MyComponent.callCount, 2);
	t.deepEqual(MyComponent.args[1][0], { c1: 'not-empty', c2: 21, p1: false });

	t.end();
});
