import { expectType, expectError } from 'tsd';
import {
	createContext,
	ForwardRefExoticComponent,
	PropsWithoutRef,
	RefAttributes,
	Component,
	forwardRef,
	Context,
} from 'react';
import withContext, { PropsWithContext } from '..';

type C1 = { field1: string };
type C2 = { field2: number };
type Props = { c1: C1; c2: C2; f2: string };

const myContext1 = createContext<C1>({ field1: '' });
const myContext2 = createContext<C2>({ field2: 1 });

declare function checkContextType<
	P extends Record<string, Context<any>>
>(): PropsWithContext<P>;

expectType<{ c1?: C1; c2?: C2 }>(
	checkContextType<{ c1: typeof myContext1; c2: typeof myContext2 }>()
);

class MyComponent extends Component<Props> {}

expectType<
	ForwardRefExoticComponent<
		PropsWithoutRef<{ c1?: C1; c2?: C2 }> & {
			f2: string;
		} & RefAttributes<MyComponent>
	>
>(withContext({ c1: myContext1, c2: myContext2 })(MyComponent));

const MyFunc = (_: Props) => null;

expectType<
	ForwardRefExoticComponent<
		PropsWithoutRef<{ c1?: C1; c2?: C2 }> & {
			f2: string;
		} & RefAttributes<unknown>
	>
>(withContext({ c1: myContext1, c2: myContext2 })(MyFunc));

const MyForward = forwardRef((_: Props) => null);

expectType<
	ForwardRefExoticComponent<
		PropsWithoutRef<{ c1?: C1; c2?: C2 }> & {
			f2: string;
		} & RefAttributes<unknown>
	>
>(withContext({ c1: myContext1, c2: myContext2 })(MyFunc));

class MyComponentOptional extends Component<Partial<Props>> {}

expectType<
	ForwardRefExoticComponent<
		PropsWithoutRef<{ c1?: C1; c2?: C2 }> & {
			f2?: string;
		} & RefAttributes<MyComponentOptional>
	>
>(withContext({ c1: myContext1, c2: myContext2 })(MyComponentOptional));

// Errors

expectError(withContext({ c1: myContext1 })((_: { c1: string }) => null));
