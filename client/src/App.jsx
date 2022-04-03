import { useState } from 'react';
import './App.css';
import DataSource from './components/DataSource';
import SummarizedText from './components/SummarizedText';
import TextTypeTabs from './components/TextTypeTabs';

function App() {
  const [text, setText] = useState();
  const [loading, setLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0);
  const [fullText, setFullText] = useState();
  const [summarizedText, setSummarizedText] = useState();

  const handleSelectedChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setText(fullText);
    }
    else setText(summarizedText);
  };

  return (
    <div className="App">
      <DataSource
        onTextChange={(text) => setText(text)}
        setFullText={setFullText}
        setSummarizedText={setSummarizedText}
        loading={loading}
        setLoading={setLoading}
      />
      <TextTypeTabs handleSelectedChange={handleSelectedChange} selectedTab={selectedTab} />
      <SummarizedText text={text} onTextChange={(text) => setText(text)} />
    </div>
  );
}

export default App;
