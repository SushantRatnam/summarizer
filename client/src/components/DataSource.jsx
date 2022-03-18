import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DataSource() {
  const [source, setSource] = useState('youtube');
  const [inputUrl, setInputUrl] = useState('');
  const [inputUrlError, setinputUrlError] = useState(false);
  const [fileUpload, setFileUpload] = useState();

  const Input = styled('input')({
    display: 'none',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setinputUrlError(false);
    const isUrl = ['youtube', 'uri'].some((el) => el === source);
    if (isUrl) {
      const regexCheck = inputUrl.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim
      );
      if (!regexCheck) {
        setinputUrlError(true);
        return;
      }
      console.log({
        source,
        inputUrl,
      });
    }
    if (fileUpload)
      console.log({
        source,
        fileUpload,
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Choose source</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
          }}
        >
          <FormControlLabel value="uri" control={<Radio />} label="From URI" />
          <FormControlLabel value="youtube" control={<Radio />} label="YouTube" />
          <FormControlLabel value="upload" control={<Radio />} label="Upload File" />
        </RadioGroup>
        {['youtube', 'uri'].some((el) => el === source) && (
          <TextField
            required
            fullWidth
            id="outlined"
            label="Enter URL"
            variant="outlined"
            onChange={(e) => setInputUrl(e.target.value)}
            error={inputUrlError}
          />
        )}
        {source === 'upload' && (
          <label htmlFor="contained-button-file">
            <Input
              accept="audio/*, video/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={(e) => setFileUpload(e.target.files)}
            />
            <Button variant="contained" component="span">
              Upload
            </Button>
            <IconButton aria-label="delete" color="primary" onClick={() => setFileUpload(null)}>
              <DeleteIcon />
            </IconButton>
            {fileUpload && <p>{fileUpload[0].name}</p>}
          </label>
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </FormControl>
    </form>
  );
}
