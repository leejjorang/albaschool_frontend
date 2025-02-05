// Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import styled from "styled-components";
import Image from "@tiptap/extension-image";

interface TiptapProps {
  onContentChange: (content: string) => void;
  initialContent?: string;
}
const Tiptap = ({ onContentChange, initialContent = "" }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        allowBase64: true, // base64 이미지 허용
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  return (
    <EditorContainer>
      <Toolbar editor={editor} />
      <EditorWrapper>
        <EditorContent editor={editor} />
      </EditorWrapper>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  width: 100%;
  height: 75%;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  overflow: hidden;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
`;

const EditorWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;

  // 스크롤바 스타일링
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #faed7d;
    border-radius: 4px;

    &:hover {
      background: #ffd400;
    }
  }

  .ProseMirror {
    // Tiptap 에디터의 메인 편집 영역
    outline: none;
    height: 100%;

    p {
      margin: 0.5rem 0; // 문단 간격 조정
      line-height: 1.5;
    }

    img {
      max-width: 90%;
      height: auto;
      display: block;
      margin: 1rem auto;
    }

    & > ol {
      counter-reset: item;
      margin-left: 1em;

      & > li {
        display: block;
        position: relative;
        padding-left: 2em;

        &::before {
          content: counter(item) ".";
          counter-increment: item;
          position: absolute;
          left: 0.5em;
        }
      }
    }

    & > ul {
      margin-left: 1em;

      & > li {
        display: block;
        position: relative;
        padding-left: 2em;

        &::before {
          content: "•";
          position: absolute;
          left: 0.5em;
        }
      }
    }
  }
`;

export default Tiptap;
