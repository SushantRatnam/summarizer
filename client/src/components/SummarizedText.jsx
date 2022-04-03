import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

export default function SummarizedText({ text, onTextChange }) {
  return (
    <>
        <TextareaAutosize
          aria-label="maximum height"
          placeholder="Summarized text will be shown here"
          minRows={20}
          value={text}
          style={{ width: 1000 }}
        />
        <Button onClick={() => onTextChange('')} variant="contained">
          Clear
        </Button>
    </>
  );
}
