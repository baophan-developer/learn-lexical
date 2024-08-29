import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {InitialConfigType, LexicalComposer} from "@lexical/react/LexicalComposer";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {useMemo} from "react";
import styled from "styled-components";
import ToolbarPlugin from "./Plugin/ToolbarPlugin";
import MyOnChangePlugin from "./Plugin/OnChangePlugin";
import theme from "../../utils/theme.editor";

const EditorContainer = styled.div`
	margin: 20px auto 20px auto;
	border-radius: 2px;
	/* min-width: 600px; */
	/* max-width: 600px; */
	color: #000;
	position: relative;
	line-height: 20px;
	font-weight: 400;
	text-align: left;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`;

const EditorInner = styled.div`
	background-color: #fff;
	position: relative;
`;

const EditorInput = styled(ContentEditable)`
	/* min-height: 150px; */
	width: 800px;
	height: 600px;
	resize: none;
	font-size: 15px;
	caret-color: rgb(5, 5, 5);
	position: relative;
	tab-size: 1;
	outline: 0;
	padding: 15px 10px;
	overflow: auto;
`;

const EditorPlaceholder = styled.div`
	color: #999;
	overflow: hidden;
	position: absolute;
	text-overflow: ellipsis;
	top: 15px;
	left: 10px;
	font-size: 15px;
	user-select: none;
	display: inline-block;
	pointer-events: none;
`;

type EditorProps = {
	onChange: (value: unknown) => void;
};
const Editor = (props: EditorProps) => {
	const {onChange} = props;

	const initialConfig: InitialConfigType = useMemo(() => {
		return {
			namespace: "Editor-Space",
			nodes: [],
			theme,
			onError(error, editor) {
				console.log({error, editor});
			},
		};
	}, []);

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<EditorContainer>
				<ToolbarPlugin />
				<EditorInner>
					<RichTextPlugin
						contentEditable={
							<EditorInput
								aria-placeholder='You can edit some thing here...'
								placeholder={
									<EditorPlaceholder>
										You can edit some thing here...
									</EditorPlaceholder>
								}
							/>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
					<MyOnChangePlugin onChange={onChange} />
				</EditorInner>
			</EditorContainer>
		</LexicalComposer>
	);
};

export default Editor;
