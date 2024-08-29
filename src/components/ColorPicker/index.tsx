import {PropsWithChildren} from "react";

type ColorPickerProps = {
	title?: string;
	color: string;
	buttonClassName: string;
	buttonLabel?: string;
	buttonAriaLabel?: string;
	buttonIconClassName?: string;
	onChange?: (color: string) => void;
};

const ColorPicker = (props: PropsWithChildren<ColorPickerProps>) => {
	const {} = props;

	return <></>;
};

export default ColorPicker;
