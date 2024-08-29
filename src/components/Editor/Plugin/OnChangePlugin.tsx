import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useEffect} from "react";

type MyOnChangePluginProps = {
	onChange: (value: unknown) => void;
};
const OnChangePlugin = (props: MyOnChangePluginProps) => {
	const {onChange} = props;

	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		return editor.registerUpdateListener(({editorState}) => {
			onChange({editorState, editor});
		});
	}, [editor, onChange]);

	return null;
};

export default OnChangePlugin;
