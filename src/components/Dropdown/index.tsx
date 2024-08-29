import {
	createContext,
	MouseEvent,
	PropsWithChildren,
	RefObject,
	useContext,
	useEffect,
	useRef,
} from "react";

type DropdownContextType = {
	registerItem: (ref: RefObject<HTMLButtonElement>) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

type DropdownItemProps = {
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
	className: string;
	title?: string;
};
export const DropdownItem = (props: PropsWithChildren<DropdownItemProps>) => {
	const {className, onClick, title, children} = props;

	const buttonRef = useRef<HTMLButtonElement>(null);

	const dropdownContext = useContext(DropdownContext);

	if (dropdownContext === null) {
		throw new Error("DropdownItem must be used within a Dropdown.");
	}

	const {registerItem} = dropdownContext;

	useEffect(() => {
		if (buttonRef && buttonRef.current) {
			registerItem(buttonRef);
		}
	}, [registerItem]);

	return (
		<button className={className} onClick={onClick} ref={buttonRef} title={title}>
			{children}
		</button>
	);
};
