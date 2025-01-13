import { Editor } from "@tiptap/react";
import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { TbH1, TbH2 } from "react-icons/tb";
import { FaBold, FaItalic } from "react-icons/fa";
import { ImStrikethrough } from "react-icons/im";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaImage } from "react-icons/fa6";

const ToolbarContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent:"center",
  gap: "5px",
  padding: "8px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
});

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ isActive }) => ({
  backgroundColor: isActive ? "rgba(0, 0, 0, 0.08)" : "transparent",
  padding: "4px 8px",
  borderRadius: "4px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          editor?.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolbarContainer>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
      >
        <TbH1 />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
      >
        <TbH2 />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <FaBold />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <FaItalic />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <ImStrikethrough />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <MdFormatListBulleted />
      </StyledIconButton>
      <StyledIconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <GoListOrdered />
      </StyledIconButton>
      <StyledIconButton>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <FaImage />
        </label>
      </StyledIconButton>
    </ToolbarContainer>
  );
};

export default Toolbar;
