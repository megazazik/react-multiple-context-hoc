import React, {
	useContext,
	Context,
	ContextType,
	forwardRef,
	RefAttributes,
	ComponentType,
} from 'react';

export type RefType<P, C> = P extends RefAttributes<infer R>
	? R
	: C extends React.ComponentClass<any>
	? InstanceType<C>
	: unknown;

export type WrappedProps<
	Props,
	Contexts extends Record<string, Context<any>>
> = Omit<Props, keyof Contexts> & PropsWithContext<Contexts>;

export type PropsWithContext<Contexts extends Record<string, Context<any>>> = {
	[K in keyof Contexts]?: ContextType<Contexts[K]>;
};

function getName(Component: any) {
	return (
		Component.displayName ||
		Component.name ||
		(typeof Component === 'string' && Component.length > 0
			? Component
			: 'Unknown')
	);
}

const withContext = <TContexts extends Record<string, Context<any>>>(
	contexts: TContexts
) => {
	return function <
		C extends React.ComponentType<any>,
		P extends PropsWithContext<TContexts>
	>(Component: C & ComponentType<P>) {
		const withContext = forwardRef<
			RefType<P, C>,
			WrappedProps<P, TContexts>
		>((props: any, ref) => {
			const contextValues = Object.keys(contexts).reduce(
				(prev, key: keyof TContexts) => {
					prev[key] = useContext(contexts[key]);
					return prev;
				},
				{} as PropsWithContext<TContexts>
			);
			return <Component {...props} ref={ref} {...contextValues} />;
		});
		withContext.displayName = `WithMultipleContext(${getName(Component)}`;
		return withContext;
	};
};

export default withContext;
