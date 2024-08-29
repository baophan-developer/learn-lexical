import styled from "styled-components";
import {useCallback, useEffect, useRef, useState} from "react";
import {
	$getSelection,
	$isRangeSelection,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	FORMAT_TEXT_COMMAND,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {mergeRegister} from "@lexical/utils";
import {
	FaUndo as UndoIcon,
	FaRedo as RedoIcon,
	FaBold as BoldIcon,
	FaItalic as ItalicIcon,
	FaUnderline as UnderlineIcon,
	FaStrikethrough as StrikethroughIcon,
	FaAlignLeft as AlignLeftIcon,
	FaAlignRight as AlignRightIcon,
	FaAlignCenter as AlignCenterIcon,
	FaAlignJustify as AlignJustifyIcon,
} from "react-icons/fa";

const lowPriority = 1;

const Divider = styled.div`
	width: 1px;
	margin: 0 4px;
	background-color: #eee;
`;

const ToolBar = styled.div`
	display: flex;
	margin-bottom: 1px;
	background: #fff;
	padding: 4px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	vertical-align: middle;
`;

const ToolBarItem = styled.button<{$spaced?: boolean; $active?: boolean}>`
	display: flex;
	border: 0;
	padding: 8px;
	border-radius: 10px;
	margin-right: ${(props) => (props.$spaced ? "2px" : "unset")};
	background-color: ${(props) => (props.$active ? "rgba(223, 232, 250, 0.3)" : "none")};
	vertical-align: middle;
	cursor: pointer;

	:disabled {
		cursor: not-allowed;
	}
`;

const ToolbarPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const toolbarRef = useRef(null);

	const [canUnDo, setCanUnDo] = useState(false);
	const [canReDo, setCanReDo] = useState(false);

	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderLine, setIsUnderLine] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);

	const $updateToolBar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			setIsBold(selection.hasFormat("bold"));
			setIsItalic(selection.hasFormat("italic"));
			setIsUnderLine(selection.hasFormat("underline"));
			setIsStrikethrough(selection.hasFormat("strikethrough"));
		}
	}, []);

	useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({editorState}) => {
				editorState.read(() => {
					$updateToolBar();
				});
			}),
			editor.registerCommand(
				SELECTION_CHANGE_COMMAND,
				() => {
					$updateToolBar();
					return false;
				},
				lowPriority,
			),
			editor.registerCommand(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUnDo(payload);
					return false;
				},
				lowPriority,
			),
			editor.registerCommand(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanReDo(payload);
					return false;
				},
				lowPriority,
			),
		);
	}, [$updateToolBar, editor]);

	return (
		<ToolBar ref={toolbarRef}>
			<ToolBarItem
				$spaced
				disabled={!canUnDo}
				aria-label='Undo'
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
			>
				<UndoIcon />
			</ToolBarItem>
			<ToolBarItem
				disabled={!canReDo}
				aria-label='Redo'
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND, undefined);
				}}
			>
				<RedoIcon />
			</ToolBarItem>
			<Divider />
			<ToolBarItem
				$spaced
				$active={isBold}
				aria-label='Format bold'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
				}}
			>
				<BoldIcon />
			</ToolBarItem>
			<ToolBarItem
				$spaced
				$active={isItalic}
				aria-label='Format Italics'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
				}}
			>
				<ItalicIcon />
			</ToolBarItem>
			<ToolBarItem
				$spaced
				$active={isUnderLine}
				aria-label='Format Underline'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
				}}
			>
				<UnderlineIcon />
			</ToolBarItem>
			<ToolBarItem
				$active={isStrikethrough}
				aria-label='Format Strikethrough'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
				}}
			>
				<StrikethroughIcon />
			</ToolBarItem>
			<Divider />
			<ToolBarItem
				$spaced
				aria-label='Align Left'
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
				}}
			>
				<AlignLeftIcon />
			</ToolBarItem>
			<ToolBarItem
				$spaced
				aria-label='Align Center'
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
				}}
			>
				<AlignCenterIcon />
			</ToolBarItem>
			<ToolBarItem
				$spaced
				aria-label='Align Right'
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
				}}
			>
				<AlignRightIcon />
			</ToolBarItem>
			<ToolBarItem
				aria-label='Align Justify'
				onClick={() => {
					editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
				}}
			>
				<AlignJustifyIcon />
			</ToolBarItem>
		</ToolBar>
	);
};

export default ToolbarPlugin;
