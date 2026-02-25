import Control from "./Control";
import { Editor } from "@tiptap/core";
import Separator from "./Separater";
import { Component, createSignal, onCleanup, onMount } from "solid-js";
import { Undo2, Edit, Save, ALargeSmall, ChevronDown, ListOrdered, Heading, SquarePlay, BookOpen, Bold, Italic, Underline, Strikethrough, Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, List, AlignCenter, AlignLeft, AlignRight, AlignJustify, SubscriptIcon, SuperscriptIcon, Highlighter, Quote, LinkIcon, Image, Table, Undo, Redo, AlignJustifyIcon, HighlighterIcon, ALargeSmallIcon, SquareCode } from 'lucide-solid';
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { Button } from "@kobalte/core/button";
import { Icon } from "@iconify-icon/solid"
import { uploadEmbeddedImage } from "../../exports";

const ToolbarContents: Component<{ editor: Editor }> = ( { editor } ) => {

    function cmd(action: string, arg?: any) { editor.chain().focus()[action](arg).run() }

    function setColor(e: Event) { editor.chain().focus().setColor(e.currentTarget?.value).run() }

    function setHighlight(e: Event) { editor.chain().focus().setBackgroundColor( e.currentTarget?.value ).run() }

    function setLink() {

        const url = prompt('Enter link:')
        if (url) editor.chain().focus().setLink({ href: url }).run()

    }

    function addTable() { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() }

    function onImageUpload(e: Event) {

        const file = e.target?.files[0]
        if (!file) return

        uploadEmbeddedImage( file ).then( ( res ) => {
            console.log( res );
            editor.chain().focus().setImage({ src: res }).run();
        })


    }

    const [ currentColor, setCurrentColor ] = createSignal<string>("#000000");
    const [ currentHighlight, setCurrentHighlight ] = createSignal<string>("#FFFFFF");

    onMount( () => {

        const updateColor = () => {
            const textStyle = editor.getAttributes("textStyle");
            setCurrentColor( textStyle.color ?? "#000000" );
            setCurrentHighlight( textStyle.backgroundColor ?? "#FFFFFF" );
        };

        updateColor(); // initial
        editor.on("selectionUpdate", updateColor);
        editor.on("transaction", updateColor);

        onCleanup(() => {
        editor.off("selectionUpdate", updateColor);
        editor.off("transaction", updateColor);
        });

    })

    return (
        
        <div class="flex flex-col py-6 px-7.5 gap-1.5 border-b-2 relative bg-gray-200/75">

            <div class="flex flex-wrap">

                <div class="flex items-center gap-1.5">

                    <Control key="bold" editor={editor} onChange={() => cmd('toggleBold')} title="Bold"> <Bold/> </Control>
                    <Control key="italic" editor={editor} onChange={() => cmd('toggleItalic')} title="Italic"> <Italic/> </Control>
                    <Control key="underline" editor={editor} onChange={() => cmd('toggleUnderline')} title="Underline"> <Underline/> </Control>
                    <Control key="strikethrough" editor={editor} onChange={() => cmd('toggleStrike')} title="Strikethrough"> <Strikethrough/> </Control>

                    <DropdownMenu attr-memo="fontSize" placement="bottom">
                        <DropdownMenu.Trigger class="flex p-1.5"> <ALargeSmall/><ChevronDown class=""/> </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content class="flex flex-col gap-1.5 bg-white p-3 px-4.5 border border-gray-400">
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('unsetFontSize')}> Unset </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '8px')}> 8 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '9px')}> 9 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '10px')}> 10 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '11px')}> 11 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '12px')}> 12 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '13px')}> 13 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '14px')}> 14 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '16px')}> 16 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '18px')}> 18 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '24px')}> 24 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '36px')}> 36 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '48px')}> 48 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '60px')}> 60 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '72px')}> 72 </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('setFontSize', '96px')}> 96 </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu>

                    <Button attr-memo="textColor" as-child class="h-fit rounded-none p-1.5">
                        <label for="textColor">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-baseline-icon lucide-baseline">
                                <path d="M4 22h16" stroke={currentColor()} stroke-width="4"/>
                                <path d="m6 16 6-12 6 12"/>
                                <path d="M8 12h8"/>
                            </svg>
                        </label>
                    </Button>
                    <input type="color" onInput={(e : InputEvent) => setColor(e)} name="textColor" id="textColor" hidden/>

                    <Button attr-memo="textHighlight" as-child class="h-fit rounded-none p-1.5">
                        <label for="highlight">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-highlighter-icon lucide-highlighter">
                                <path d="M4 22h16" stroke={currentHighlight()} stroke-width="4"/>
                                <g transform="scale(0.85)" transform-origin="top">
                                    <path d="m9 11-6 6v3h9l3-3"/>
                                    <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
                                </g>
                            </svg>
                        </label>
                    </Button>
                    <input type="color" onInput={ (e) => setHighlight(e) } id="highlight" name="highlight" hidden/>

                    <DropdownMenu attr-memo="heading" placement="bottom">
                        <DropdownMenu.Trigger class="flex p-1.5"> <Heading/><ChevronDown class=""/> </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content class="flex bg-white leading-0 p-3 px-4.5 border border-gray-400">
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 1 })}> <Heading1/> </Button></DropdownMenu.Item>
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 2 })}> <Heading2/> </Button></DropdownMenu.Item>
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 3 })}> <Heading3/> </Button></DropdownMenu.Item>
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 4 })}> <Heading4/> </Button></DropdownMenu.Item>
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 5 })}> <Heading5/> </Button></DropdownMenu.Item>
                                <DropdownMenu.Item as-child><Button class="h-fit px-2 cursor-pointer rounded-none" onClick={ () => cmd('toggleHeading', { level: 6 })}> <Heading6/> </Button></DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu>

                </div>

                <Separator/>

                <div class="flex items-center gap-1.5">

                    <DropdownMenu attr-memo="lists" placement="bottom">
                        <DropdownMenu.Trigger class="flex p-1.5"> <List/><ChevronDown/> </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content class="flex flex-col gap-1.5 bg-white p-3 px-4.5 border border-gray-400">
                                <DropdownMenu.Item onClick={ () => cmd('toggleBulletList')} class="flex gap-3 cursor-pointer"><List/> Dotted</DropdownMenu.Item>
                                <DropdownMenu.Item onClick={ () => cmd('toggleOrderedList')} class="flex gap-3 cursor-pointer"><ListOrdered/> Number</DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu>

                    <Control key={{ textAlign: 'left' }} editor={editor} title="Align left" onChange={ () => cmd('setTextAlign', 'left')}> <AlignLeft/> </Control>
                    <Control key={{ textAlign: 'center' }} editor={editor} title="Align center" onChange={ () => cmd('setTextAlign', 'center')}> <AlignCenter/> </Control>
                    <Control key={{ textAlign: 'right' }} editor={editor} title="Align right" onChange={ () => cmd('setTextAlign', 'right')}> <AlignRight/> </Control>
                    <Control key={{ textAlign: 'justify' }} editor={editor} title="Align justify" onChange={ () => cmd('setTextAlign', 'justify')}> <AlignJustify/> </Control>

                    <DropdownMenu attr-memo="lineHeight" placement="bottom">
                        <DropdownMenu.Trigger class="leading-0 p-1.5">
                            <Icon icon="tabler:line-height" width={24}/>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.Content class="flex flex-col gap-1.5 bg-white p-3 px-4.5 border border-gray-400">
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('unsetLineHeight')}> Unset </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '1'})}> 100% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '1' })}> 100% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '1.5' })}> 150% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '2' })}> 200% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '2.5' })}> 250% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '3' })}> 300% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '3.5' })}> 350% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '4' })}> 400% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '4.5' })}> 450% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '5' })}> 500% </DropdownMenu.Item>
                                <DropdownMenu.Item class="cursor-pointer" onClick={ () => cmd('toggleTextStyle', { lineHeight: '6' })}> 600% </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu>

                </div>

                <Separator/>

                <div class="flex items-center gap-1.5">

                    <Control key="subscript" editor={editor} onChange={() => cmd('toggleSubscript')} title="Subscript"> <SubscriptIcon/> </Control>
                    <Control key="superscript" editor={editor} onChange={() => cmd('toggleSuperscript')} title="Superscript"> <SuperscriptIcon/> </Control>
                    <Control key="blockquote" editor={editor} onChange={() => cmd('toggleBlockquote')} title="Blockquote"> <Quote/> </Control>

                </div>

            </div>

            <div class="flex gap-1.5 items-center">

                <Button class="h-fit rounded-none p-1.5" onClick={ () => setLink() }> <LinkIcon/> </Button>
                <Button class="h-fit rounded-none p-1.5">
                    <label for="image"><Image/></label>
                </Button>
                <input type="file" accept="image/*" onChange={onImageUpload} hidden name="image" id="image"/>

                <Control key="codeBlock" editor={editor} onChange={() => cmd('toggleCodeBlock')} title="Code block"> <SquareCode/> </Control>
                <Control key="code" editor={editor} onChange={() => cmd('toggleCode')} title="Code"> <Code/> </Control>
                <Button class="h-fit rounded-none p-1.5" onClick={addTable}> <Table/> </Button>

                <Button class="h-fit p-1.5" onClick={() => cmd('undo')}> <Undo/> </Button>
                <Button class="h-fit p-1.5" onClick={() => cmd('redo')}> <Redo/> </Button>

            </div>

        </div>

    );

}

export default ToolbarContents;